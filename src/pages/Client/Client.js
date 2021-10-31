import React, {useContext, useEffect, useState} from 'react';
import { Backdrop, CircularProgress, Alert, AlertTitle, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { Helmet } from 'react-helmet';
import { Route, Switch, Redirect, useRouteMatch, useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import thegraph from '../../api/thegraph';
import web3 from '../../api/web3';
import { useStyles } from './styles';
import { LoginContext } from '../../contexts/LoginContext';

import itemUtils from '../../utils/itemUtils';
import commonUtils from '../../utils/commonUtils';
import graphUtils from '../../utils/graphUtils';

import LoginNavigation from '../../components/Login/LoginNavigation';
import ClientTabs from './components/ClientTabs';
import ClientGotchis from './routes/ClientGotchis';
import ClientWarehouse from './routes/ClientWarehouse';
import ClientTickets from './routes/ClientTickets';

import ghstIcon from '../../assets/images/ghst-doubleside.gif';

export default function Client() {
    const classes = useStyles();
    const match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();

    const params = queryString.parse(location.search)

    const [gotchis, setGotchis] = useState([]);
    const [gotchisFilter, setGotchisFilter] = useState('modifiedRarityScore');
    const [isGotchiesLoading, setIsGotchiesLoading] = useState(false);

    const [warehouse, setWarehouse] = useState([]);
    const [warehouseFilter, setWarehouseFilter] = useState('desc');
    const [isInventoryLoading, setIsInventoryLoading] = useState(false);

    const [tickets, setTickets] = useState([]);
    const [isTicketsLoading, setIsTicketsLoading] = useState(false);

    const [reward, setReward] = useState(null);
    const [rewardCalculating, setRewardCalculating] = useState(false);
    const [rewardCalculated, setRewardCalculated] = useState(false);

    const { activeAddress } = useContext(LoginContext);
    const [clientActive, setClientActive] = useState(null);

    useEffect(() => {
        if(activeAddress) {
            setClientActive(activeAddress);
        }
    }, [activeAddress]);

    useEffect(() => {
        if(params.address) {
            setClientActive(params.address);
        }
    }, [params.address]);

    useEffect(() => {
        if(clientActive) {
            getData();
            history.push({ path: location.pathname, search: `?address=${clientActive}` });
        } else {
            history.push({ path: location.pathname });
        }
    }, [clientActive]);

    const getData = () => {
        getGotchiesByAddress(clientActive.toLowerCase());
        getInventoryByAddress(clientActive.toLowerCase());
        getTickets(clientActive.toLowerCase());
        
        // reset
        setWarehouse([]);
        setReward(null);
        setRewardCalculated(false);
        setGotchisFilter('modifiedRarityScore');
    };

    const getGotchiesByAddress = async (address) => {
        setIsGotchiesLoading(true);

        thegraph.getGotchiesByAddress(address).then((response)=> {
            let wearables = [];

            // collect all equipped wearables
            response.forEach((item) => {
                let equipped = item.equippedWearables.filter((item) => item > 0);

                // console.log(equipped);

                for(let wearable of equipped) {
                    let index = wearables.findIndex(item => item.id === wearable);

                    if((wearable >= 162 && wearable <= 198) || wearable === 210) continue; // skip badges or h1 bg

                    if(wearables[index] === undefined) {
                        wearables.push({
                            id: wearable,
                            balance: 1,
                            rarity: itemUtils.getItemRarityById(wearable),
                            rarityId: itemUtils.getItemRarityId(itemUtils.getItemRarityById(wearable)),
                            holders: [item.id],
                            category: 0
                        });
                    } else {
                        wearables[index].balance += 1;
                        wearables[index].holders.push(item.id);
                    }

                    if(wearables[index]?.id === 213) console.log(wearables[index]);
                }
            });

            setWarehouse((existing) => commonUtils.basicSort(
                [...existing, ...wearables].reduce((items, current) => {
                    let duplicated = items.find(item => item.id === current.id);
        
                    if(duplicated) {
                        duplicated.balance += current.balance;
                        duplicated.holders = current.holders;
                        return items;
                    }
        
                    return items.concat(current);
                }, []), 'rarityId', 'desc'));

            setGotchis(commonUtils.basicSort(response, 'modifiedRarityScore'));
            setIsGotchiesLoading(false);
        }).catch((error) => {
            console.log(error);
            setGotchis([]);
            setIsGotchiesLoading(false);
        });
    };

    const getInventoryByAddress = (address) => {
        setIsInventoryLoading(true);

        web3.getInventoryByAddress(address).then((response) => {
            let modified = [];

            response.items.forEach((item) => {
                modified.push({
                    id: +item.itemId,
                    rarity: itemUtils.getItemRarityById(item.itemId),
                    rarityId: itemUtils.getItemRarityId(itemUtils.getItemRarityById(item.itemId)),
                    balance: +item.balance,
                    category: item.itemId >= 126 && item.itemId <= 129 ? 2 : 0 // TODO: temporary solution to determine if item is consumable or not
                });
            });

            setWarehouseFilter('desc');
            setWarehouse((existing) => commonUtils.basicSort(
                [...existing, ...modified].reduce((items, current) => {
                    let duplicated = items.find(item => item.id === current.id);
        
                    if(duplicated) {
                        duplicated.balance += current.balance;
                        duplicated.holders = current.holders;
                        return items;
                    }
        
                    return items.concat(current);
                }, []), 'rarityId', 'desc'));
            setIsInventoryLoading(false);

        }).catch((error) => {
            console.log(error);
            setWarehouse([]);
            setIsInventoryLoading(false);
        });
    };

    const getTickets = (address) => {
        setIsTicketsLoading(true);

        web3.getTicketsByAddress(address).then((response) => {
            let modified = response.filter((item) => item.balance > 0);
            setTickets(modified);
            setIsTicketsLoading(false);
        }).catch((error) => {
            console.log(error);
            setTickets([]);
            setIsTicketsLoading(false);
        });
    };

    const calculateRewards = () => {
        setRewardCalculating(true);

        thegraph.getAllGotchies().then((response) => {
            let brsLeaders = commonUtils.basicSort(response, 'modifiedRarityScore');
            let kinLeaders = commonUtils.basicSort(response, 'kinship');
            let expLeaders = commonUtils.basicSort(response, 'experience');

            let h2 = response.filter((gotchi) => gotchi.hauntId === '2');
            let kinRookieLeaders = commonUtils.basicSort(h2, 'kinship');
            let expRookieLeaders = commonUtils.basicSort(h2, 'experience');

            gotchis.forEach((item, index)=>{
                let BRS = graphUtils.calculateRewards(brsLeaders.findIndex(x => x.id === item.id), 'BRS');
                let KIN = graphUtils.calculateRewards(kinLeaders.findIndex(x => x.id === item.id), 'KIN');
                let EXP = graphUtils.calculateRewards(expLeaders.findIndex(x => x.id === item.id), 'EXP');
                let rookieKIN = graphUtils.calculateRewards(kinRookieLeaders.findIndex(x => x.id === item.id), 'H2_KIN');
                let rookieEXP = graphUtils.calculateRewards(expRookieLeaders.findIndex(x => x.id === item.id), 'H2_EXP');

                gotchis[index] = {
                    ...item,
                    reward: BRS.reward + KIN.reward + EXP.reward + rookieKIN.reward + rookieEXP.reward,
                    rewardStats: [BRS, KIN, EXP, rookieKIN, rookieEXP]
                }
            });

            setReward(gotchis.reduce((prev, next) => prev + next.reward, 0));
            setRewardCalculating(false);
            setRewardCalculated(true)
        })
    };

    const isDataLoading = () => {
        return isGotchiesLoading || isInventoryLoading || isTicketsLoading;
    };

    return (
        <Box className={classes.container}>
            <Helmet>
                <title>Client</title>
            </Helmet>

            {!clientActive?.length ? (
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
                    <Box display='flex' flexWrap='wrap' justifyContent='space-between' bgcolor='secondary.dark' padding='20px' marginBottom='16px' borderRadius='4px'>
                        <Box display='flex' flexDirection='column' justifyContent='space-between'>
                            <Typography variant='h6' paragraph>
                                Logged as <Box
                                    component='span'
                                    position='relative'
                                    color={web3.isAddressValid(clientActive) ? 'success.main' : 'warning.main'}
                                >
                                    {clientActive}
                                    {!web3.isAddressValid(clientActive) ? (
                                        <Box component='span' position='absolute' right={0} bottom='-20px' whiteSpace='nowrap' fontSize='12px' color='error.main'>Not a valid address!</Box>
                                    ) : (
                                        null
                                    )}
                                </Box>
                            </Typography>

                            <ClientTabs
                                clientActive={clientActive}
                                gotchisLength={gotchis.length}
                                warehouseLength={warehouse.length}
                                ticketsLength={tickets.length}
                            />
                        </Box>

                        <Box textAlign='right'>
                            <Typography variant='h6' color='info.main' paragraph>
                                SZN 2 Rarity farming is LIVE!
                            </Typography>

                            <Box display='flex' alignItems='center' justifyContent='flex-end'>
                                {reward ? (
                                    <Typography className={classes.rewardText} variant='h6'>
                                        <span className='lighter'>{commonUtils.formatPrice(reward)}</span><img src={ghstIcon} width='24' alt='GHST Token Icon' />
                                        <Box component='span' display='inline-flex' alignItems='center' fontSize='16px' marginLeft='4px'>
                                            (<span className='lighter'>{commonUtils.formatPrice(reward / 4)}</span><img src={ghstIcon} width='18' alt='GHST Token Icon' />/round)
                                        </Box>
                                    </Typography>
                                    
                                ) : (
                                    null
                                )}

                                <Button
                                    disabled={isDataLoading() || !gotchis.length ||rewardCalculated}
                                    variant={'contained'}
                                    size='large'
                                    className={classes.calculateButton}
                                    onClick={calculateRewards}
                                >
                                    Calculate Reward
                                </Button>

                            </Box>
                        </Box>
                    </Box>

                    <Switch>
                        <Route path={`${match.path}/gotchis`}>
                            <ClientGotchis
                                gotchis={gotchis}
                                gotchisFilter={gotchisFilter}
                                setGotchisFilter={setGotchisFilter}
                                setGotchis={setGotchis}
                                rewardCalculated={rewardCalculated}
                            />
                        </Route>
                        <Route path={`${match.path}/warehouse`}>
                            <ClientWarehouse
                                warehouse={warehouse}
                                warehouseFilter={warehouseFilter}
                                setWarehouseFilter={setWarehouseFilter}
                                setWarehouse={setWarehouse}
                            />
                        </Route>
                        <Route path={`${match.path}/tickets`}>
                            <ClientTickets tickets={tickets} />
                        </Route>
                        <Redirect from={match.path} to={`${match.path}/gotchis`} />
                    </Switch>

                    <Backdrop className={classes.backdrop} open={isDataLoading() || rewardCalculating}>
                        <CircularProgress color='primary' />
                    </Backdrop>
                </>
            )}

        </Box>
    );
}
