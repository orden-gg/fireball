import React, { useEffect, useState} from 'react';
import { Container, Backdrop, CircularProgress, useTheme, } from '@mui/material';
import {Helmet} from 'react-helmet';
import thegraph from '../../api/thegraph';
import web3 from '../../api/web3';
import itemUtils from '../../utils/itemUtils';
import commonUtils from '../../utils/commonUtils';

import { useStyles } from './styles';

import AddressImportForm from '../../components/AddressImportForm/AddressImportForm';
import ClientContent from './components/ClientContent';

export default function Client() {
    const classes = useStyles();
    const theme = useTheme();
    const [addresses, setAddresses] = useState([]);
    const [gotchies, setGotchies] = useState([]);
    const [gotchiesFilter, setGotchiesFilter] = useState('withSetsRarityScore');
    const [isGotchiesLoading, setIsGotchiesLoading] = useState(false);

    const [inventory, setInventory] = useState([]);
    const [inventoryFilter, setInventoryFilter] = useState('desc');
    const [isInventoryLoading, setIsInventoryLoading] = useState(false);

    const getGotchiesByAddresses = (addresses) => {
        setIsGotchiesLoading(true);
        thegraph.getGotchiesByAddresses(addresses).then(async (response)=> {
            console.log(response);
            let combinedGotchies = [];

            response.forEach( (item)=> {
                if(item.data.user) {
                    combinedGotchies.push(...item.data.user.gotchisOwned);
                }
            });

            setGotchies(commonUtils.basicSort(combinedGotchies, gotchiesFilter));
            setIsGotchiesLoading(false);

        }).catch(()=> {
            setIsGotchiesLoading(false);
        });
    };

    const getInventoryByAddresses = (addresses) => {
        setIsInventoryLoading(true);
        web3.getInventoryByAddresses(addresses).then((response)=>{
            let combinedArray = [];

            for (let i = 0; i < response.length; i++) {
                response[i].items.forEach((item)=> {
                    let index = combinedArray.findIndex(el => el.itemId === item.itemId);
                    let owner = {
                        id: response[i].owner,
                        balance: +item.balance,
                        color: theme.palette.accounts[`color${addresses.indexOf(response[i].owner) + 1}`]
                    };

                    if(index !== -1){
                        combinedArray[index].balance = +combinedArray[index].balance + +item.balance;
                        combinedArray[index].owners.push(owner);
                    } else {
                        combinedArray.push({
                            itemId: item.itemId,
                            rarity: itemUtils.getItemRarityById(item.itemId),
                            rarityId: itemUtils.getItemRarityId(itemUtils.getItemRarityById(item.itemId)),
                            balance: +item.balance,
                            owners: [owner]
                        });
                    }
                });
            }

            setIsInventoryLoading(false);
            setInventoryFilter('desc');
            setInventory(commonUtils.basicSort(combinedArray, 'rarityId', 'desc'));
        }).catch(()=>{
            setIsInventoryLoading(false);
        });
    };

    const getData = () => {
        if(addresses.length !== 0) {
            getGotchiesByAddresses(addresses);
            getInventoryByAddresses(addresses);
        }
    }

    const rebuildContent = (addresses) => {
        if(addresses) setAddresses([...new Set(addresses.map(item => item.toLowerCase()))]);
    };

    const onGotchiesSort = (event) => {
        // TODO: add filter by owner
        setGotchies(commonUtils.basicSort(gotchies, event.target.value));
        setGotchiesFilter(event.target.value);
    };

    const onInventorySort = (event) => {
        if(event.target.value === 'asc') {
            setInventory(commonUtils.basicSort(inventory, 'rarityId', 'asc'));
        } else if(event.target.value === 'desc') {
            setInventory(commonUtils.basicSort(inventory, 'rarityId', 'desc'));
        } else {
            setInventory(commonUtils.basicSort(inventory, event.target.value, 'desc'));
        }
        setInventoryFilter(event.target.value);
    };

    useEffect( () => {
        getData();
    }, [addresses]);

    const isDataLoading = () => {
        return isGotchiesLoading || isInventoryLoading;
    };

    return (
        <Container maxWidth='lg' className={classes.container}>
            <Helmet>
                <title>Client</title>
            </Helmet>

            <AddressImportForm {...{rebuildContent}} />

            <ClientContent
                addresses={addresses}
                gotchies={gotchies}
                gotchiesFilter={gotchiesFilter}
                onGotchiesSort={onGotchiesSort}
                inventory={inventory}
                inventoryFilter={inventoryFilter}
                onInventorySort={onInventorySort}
                isDataLoading={isDataLoading}
            />

            <Backdrop className={classes.backdrop} open={isDataLoading()}>
                <CircularProgress color='primary' />
            </Backdrop>

        </Container>
    );
}
