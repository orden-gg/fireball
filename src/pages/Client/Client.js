import React, {useContext, useEffect, useState} from 'react';
import { Backdrop, CircularProgress, Alert, AlertTitle, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { Helmet } from 'react-helmet';
import thegraph from '../../api/thegraph';
import web3 from '../../api/web3';
import itemUtils from '../../utils/itemUtils';
import commonUtils from '../../utils/commonUtils';
import { useStyles } from './styles';
import { LoginContext } from '../../contexts/LoginContext';

import LoginNavigation from '../../components/Login/LoginNavigation';
import ClientTabs from './components/ClientTabs';
import ClientGotchis from './components/ClientGotchis';
import ClientWarehouse from './components/ClientWarehouse';
import ClientTickets from './components/ClientTickets';

export default function Client() {
    const classes = useStyles();

    const [activeTab, setActiveTab] = useState('gotchis');

    const [gotchis, setGotchis] = useState([]);
    const [gotchisFilter, setGotchisFilter] = useState('withSetsRarityScore');
    const [isGotchiesLoading, setIsGotchiesLoading] = useState(false);

    const [warehouse, setWarehouse] = useState([]);
    const [warehouseFilter, setWarehouseFilter] = useState('desc');
    const [isInventoryLoading, setIsInventoryLoading] = useState(false);

    const [tickets, setTickets] = useState([]);
    const [isTicketsLoading, setIsTicketsLoading] = useState(false);

    const { activeAddress } = useContext(LoginContext);

    const getGotchiesByAddress = (address) => {
        setIsGotchiesLoading(true);

        thegraph.getGotchiesByAddress(address).then(async (response)=> {
            setGotchis(commonUtils.basicSort(response.data.user?.gotchisOwned, gotchisFilter));
            setIsGotchiesLoading(false);
        }).catch((error) => console.log(error));
    };

    const getInventoryByAddress = (address) => {
        setIsInventoryLoading(true);

        web3.getInventoryByAddress(address).then((response) => {
            let modified = [];

            response.items.forEach((item) => {
                modified.push({
                    id: item.itemId,
                    rarity: itemUtils.getItemRarityById(item.itemId),
                    rarityId: itemUtils.getItemRarityId(itemUtils.getItemRarityById(item.itemId)),
                    balance: +item.balance,
                    category: item.itemId >= 126 && item.itemId <= 129 ? 2 : 0 // TODO: temporary solution to determine if item is consumable or not
                });
            });

            setIsInventoryLoading(false);
            setWarehouseFilter('desc');
            setWarehouse(commonUtils.basicSort(modified, 'rarityId', 'desc'));
        }).catch((error) => console.log(error));
    };

    const getTickets = (address) => {
        setIsTicketsLoading(true);

        web3.getTicketsByAddress(address).then((response) => {
            let modified = response.filter((item) => item.balance > 0);
            setTickets(modified);
            setIsTicketsLoading(false);
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
        return isGotchiesLoading || isInventoryLoading || isTicketsLoading;
    };

    useEffect(() => {
        getData();
    }, [activeAddress]);

    return (
        <Box className={classes.container}>
            <Helmet>
                <title>Client</title>
            </Helmet>

            {!activeAddress.length ? (
                <Box display='flex' alignItems='center' justifyContent='center' minHeight='calc(100vh - 192px)'>
                    <Box bgcolor='secondary.dark' maxWidth={400} margin='auto' padding='24px' borderRadius='4px'>
                        <Alert severity='info' sx={{ marginBottom: '24px' }}>
                            <AlertTitle>Fren, provide the address!</AlertTitle>
                            You cannot use the client without a valid ETH address.
                        </Alert>

                        <LoginNavigation />
                    </Box>
                </Box>
            ) : (
                <>
                    <Box display='flex' alignItems='flex-start' justifyContent='space-between'>
                        <Box>
                            <Typography variant='h6' paragraph>
                                Logged as <Box component='span' color='warning.main'>{activeAddress}</Box>
                            </Typography>

                            <ClientTabs
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                gotchisLength={gotchis.length}
                                warehouseLength={warehouse.length}
                                ticketsLength={tickets.length}
                            />
                        </Box>
                        <Box textAlign='right'>
                            <Typography variant='h6' color='info.main' paragraph>SZN 2 Rarity farming is LIVE!</Typography>
                            <Button
                                disabled={isDataLoading()}
                                variant={'contained'}
                                size='large'
                                // startIcon={
                                //     <img src={warehousePlaceholder} alt='gotchi' width={25} style={{ marginRight: '4px' }} />
                                // }
                                // endIcon={`[${warehouseLength}]`}
                                // sx={{ marginRight: '12px', marginBottom: '12px' }}
                                onClick={() => console.log('yo')}
                            >
                                Calculate Rewards
                            </Button>
                        </Box>
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
                </>
            )}

        </Box>
    );
}
