import React, {useContext, useEffect, useState} from 'react';
import { Container, Backdrop, CircularProgress, useTheme, } from '@mui/material';
import {Helmet} from 'react-helmet';
import thegraph from '../../api/thegraph';
import web3 from '../../api/web3';
import itemUtils from '../../utils/itemUtils';
import commonUtils from '../../utils/commonUtils';

import { useStyles } from './styles';

import ClientContent from './components/ClientContent';
import { LoginContext } from "../../contexts/LoginContext";

export default function Client() {
    const classes = useStyles();
    const theme = useTheme();
    const [signedInAddress, setSignedInAddress] = useState('');
    const [gotchies, setGotchies] = useState([]);
    const [gotchiesFilter, setGotchiesFilter] = useState('withSetsRarityScore');
    const [isGotchiesLoading, setIsGotchiesLoading] = useState(false);

    const [inventory, setInventory] = useState([]);
    const [inventoryFilter, setInventoryFilter] = useState('desc');
    const [isInventoryLoading, setIsInventoryLoading] = useState(false);
    const { activeAddress } = useContext(LoginContext);

    const getGotchiesByAddress = (addresses) => {
        setIsGotchiesLoading(true);
        thegraph.getGotchiesByAddress(addresses).then(async (response)=> {
            setGotchies(commonUtils.basicSort(response.data.user.gotchisOwned, gotchiesFilter));
            setIsGotchiesLoading(false);
        }).catch(()=> {
            setIsGotchiesLoading(false);
        });
    };

    const getInventoryByAddress = (address) => {
        setIsInventoryLoading(true);
        web3.getInventoryByAddress(address).then((response)=>{
            let combinedArray = [];

            response.items.forEach((item) => {
                let index = combinedArray.findIndex(el => el.itemId === item.itemId);
                let owner = {
                    id: response.owner,
                    balance: +item.balance,
                    color: theme.palette.accounts.color1
                };

                if (index !== -1) {
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

            setIsInventoryLoading(false);
            setInventoryFilter('desc');
            setInventory(commonUtils.basicSort(combinedArray, 'rarityId', 'desc'));
        }).catch(()=>{
            setIsInventoryLoading(false);
        });
    };

    const getData = () => {
        if (signedInAddress) {
            getGotchiesByAddress(signedInAddress);
            getInventoryByAddress(signedInAddress);
        }
    }

    const rebuildContent = (address) => {
        if (address) setSignedInAddress(address.toLowerCase());
    };

    const onGotchiesSort = (event) => {
        // TODO: add filter by owner
        setGotchies(commonUtils.basicSort(gotchies, event.target.value));
        setGotchiesFilter(event.target.value);
    };

    const onInventorySort = (event) => {
        if (event.target.value === 'asc') {
            setInventory(commonUtils.basicSort(inventory, 'rarityId', 'asc'));
        } else if (event.target.value === 'desc') {
            setInventory(commonUtils.basicSort(inventory, 'rarityId', 'desc'));
        } else {
            setInventory(commonUtils.basicSort(inventory, event.target.value, 'desc'));
        }
        setInventoryFilter(event.target.value);
    };

    const isDataLoading = () => {
        return isGotchiesLoading || isInventoryLoading;
    };

    useEffect( () => {
        getData();
    }, [signedInAddress]);

    useEffect(() => {
        rebuildContent(activeAddress);
    }, [activeAddress]);

    return (
        <Container maxWidth='lg' className={classes.container}>
            <Helmet>
                <title>Client</title>
            </Helmet>

            <ClientContent
                signedInAddress={signedInAddress}
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
