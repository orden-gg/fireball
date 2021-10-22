import React, {useContext, useEffect, useState} from 'react';
import { Backdrop, CircularProgress, useTheme, Button } from '@mui/material';
import { Box } from '@mui/system';
import { Helmet } from 'react-helmet';
import thegraph from '../../api/thegraph';
import web3 from '../../api/web3';
import itemUtils from '../../utils/itemUtils';
import commonUtils from '../../utils/commonUtils';
import { useStyles } from './styles';
import { LoginContext } from '../../contexts/LoginContext';

import ClientGotchis from './components/ClientGotchis';
import ClientWarehouse from './components/ClientWarehouse';

import gotchiPlaceholder from '../../assets/images/logo.png';
import warehousePlaceholder from '../../assets/wearables/15.svg';
import ticketsPlaceholder from '../../assets/tickets/rare.svg';
import ClientTickets from './components/ClientTickets';

export default function Client() {
    const classes = useStyles();
    const theme = useTheme();

    const [activeTab, setActiveTab] = useState('gotchis');

    const [gotchis, setGotchis] = useState([]);
    const [gotchisFilter, setGotchisFilter] = useState('withSetsRarityScore');
    const [isGotchiesLoading, setIsGotchiesLoading] = useState(false);

    const [warehouse, setWarehouse] = useState([]);
    const [warehouseFilter, setWarehouseFilter] = useState('desc');
    const [isInventoryLoading, setIsInventoryLoading] = useState(false);

    const [tickets, setTickets] = useState([]);

    const { activeAddress } = useContext(LoginContext);

    const getGotchiesByAddress = (address) => {
        setIsGotchiesLoading(true);
        thegraph.getGotchiesByAddress(address).then(async (response)=> {
            setGotchis(commonUtils.basicSort(response.data.user?.gotchisOwned, gotchisFilter));
            setIsGotchiesLoading(false);
        }).catch(()=> {
            setIsGotchiesLoading(false);
        });
    };

    const getInventoryByAddress = (address) => {
        setIsInventoryLoading(true);
        web3.getInventoryByAddress(address).then((response) => {
            let combinedArray = [];

            console.log(response.items)

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
            setWarehouseFilter('desc');
            setWarehouse(commonUtils.basicSort(combinedArray, 'rarityId', 'desc'));
        }).catch(() => {
            setIsInventoryLoading(false);
        });
    };

    const getTickets = (address) => {
        web3.getTicketsByAddress(address).then((response) => {
            setTickets(response);
        }).catch((error) => console.log(error));
    };

    const getData = () => {
        if (activeAddress) {
            getGotchiesByAddress(activeAddress.toLowerCase());
            getInventoryByAddress(activeAddress.toLowerCase());
            getTickets(activeAddress.toLowerCase());
        }
    };

    const isDataLoading = () => {
        return isGotchiesLoading || isInventoryLoading;
    };

    useEffect( () => {
        getData();
    }, [activeAddress]);

    return (
        <Box className={classes.container}>
            <Helmet>
                <title>Client</title>
            </Helmet>

            <Box marginBottom='40px'>Logged as {activeAddress}</Box>

            <Box display='flex' alignItems='flex-start' flexWrap='wrap' marginBottom='20px'>
                <Button
                    disabled={!gotchis.length}
                    variant={activeTab === 'gotchis' ? 'contained' : 'outlined'}
                    size='large'
                    startIcon={
                        <img src={gotchiPlaceholder} alt='gotchi' width={25} style={{ marginRight: '4px' }} />
                    }
                    endIcon={`[${gotchis.length}]`}
                    sx={{ marginRight: '12px', marginBottom: '12px' }}
                    onClick={() => setActiveTab('gotchis')}
                >
                    Gotchis
                </Button>

                <Button
                    disabled={!warehouse.length}
                    variant={activeTab === 'warehouse' ? 'contained' : 'outlined'}
                    size='large'
                    startIcon={
                        <img src={warehousePlaceholder} alt='gotchi' width={25} style={{ marginRight: '4px' }} />
                    }
                    endIcon={`[${warehouse.length}]`}
                    sx={{ marginRight: '12px', marginBottom: '12px' }}
                    onClick={() => setActiveTab('warehouse')}
                >
                    Warehouse
                </Button>

                <Button
                    disabled={!tickets.length}
                    variant={activeTab === 'tickets' ? 'contained' : 'outlined'}
                    size='large'
                    startIcon={
                        <img src={ticketsPlaceholder} alt='gotchi' width={27} style={{ marginRight: '4px' }} />
                    }
                    endIcon={`[${tickets.length}]`}
                    onClick={() => setActiveTab('tickets')}
                >
                    Tickets
                </Button>
            </Box>

            {activeTab === 'gotchis' ? (
                <ClientGotchis
                    gotchis={gotchis}
                    gotchisFilter={gotchisFilter}
                    setGotchisFilter={setGotchisFilter}
                    setGotchis={setGotchis}
                />
            ) : (
                null
            )}

            {activeTab === 'warehouse' ? (
                <ClientWarehouse
                    warehouse={warehouse}
                    warehouseFilter={warehouseFilter}
                    setWarehouseFilter={setWarehouseFilter}
                    setWarehouse={setWarehouse}
                />
            ) : (
                null
            )}

            {activeTab === 'tickets' ? (
                <ClientTickets tickets={tickets} />
            ) : (
                null
            )}

            <Backdrop className={classes.backdrop} open={isDataLoading()}>
                <CircularProgress color='primary' />
            </Backdrop>

        </Box>
    );
}
