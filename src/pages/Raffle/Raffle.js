import React, {useEffect, useState} from 'react';
import { Box, Button, Container, Link, Typography, Grid } from '@mui/material';
import {Helmet} from 'react-helmet';
import RaffleTable from './components/RaffleTable';
import RaffleWearables from './components/RaffleWearables';
import {ticketsData} from './data/ticketsData';
import {useStyles} from './styles';
import thegraph from '../../api/thegraph';
import {raffle6TotalEnteredQuery, raffleTicketPriceQuery} from './data/queries';
import Countdown from '../../components/Countdown/Countdown';
import { DateTime } from 'luxon';

const raffleStartDate = DateTime.local(2021, 9, 24, 14, { zone: 'utc' });
const raffleEndDate = DateTime.local(2021, 9, 27, 14, { zone: 'utc' });

const countdowns = [
    {
        text: `Starts in ${'->'}`,
        date: raffleStartDate
    },
    {
        text: `Ends in ${'->'}`,
        date: raffleEndDate,
        liveLabel: true
    },
    {
        text: `Raffle ended`
    }
]

export default function Raffle() {
    const classes = useStyles();
    const [tickets, setTickets] = useState([...ticketsData]);
    const [ticketsCache, setTicketsCache] = useState([...tickets]);
    // const { showSnackbar } = useContext(SnackbarContext);
    // const [snackbarShowsOnFirstLoading, setSnackbarShowsOnFirstLoading] = useState(true);
    const [supplySpinner, setSupplySpinner] = useState(true);
    const [pricesSpinner, setPricesSpinner] = useState(true);
    // const [lastTicketInfo, setLastTicketInfo] = useState('');
    // const [dropQuantity, setDropQuantity] = useState('');
    const [enteredCombined, setEnteredCombined] = useState(true);
    const [currentCountdown, setCurrentCountdown] = useState(0);


    // const [activeRaffle, setActiveRaffle] = React.useState('5');

    // const onTabsChange = (event, newValue) => {
    //     setActiveRaffle(newValue);
    // };

    const [commonQuantity, setCommonQuantity] = useState('');
    const [uncommonQuantity, setUncommonQuantity] = useState('');
    const [rareQuantity, setRareQuantity] = useState('');
    const [legendaryQuantity, setLegendaryQuantity] = useState('');
    const [mythicalQuantity, setMythicalQuantity] = useState('');
    const [godlikeQuantity, setGodlikeQuantity] = useState('');
    // const [enteredSupplyType, setEnteredSupplyType] = useState(true);

    const getTicketQuantity = (type) => {
        const map = {
            'common': () => {
                return commonQuantity;
            },
            'uncommon': () => {
                return uncommonQuantity;
            },
            'rare': () => {
                return rareQuantity;
            },
            'legendary': () => {
                return legendaryQuantity;
            },
            'mythical': () => {
                return mythicalQuantity;
            },
            'godlike': () => {
                return godlikeQuantity;
            },
            // 'drop': () => {
            //     return dropQuantity;
            // }
        };

        try {
            return map[type]();
        } catch (err) {
            return 0;
        }
    };

    const onFieldChange = () => {
        countTicketsChance();
    };

    const countTicketsChance = () => {
        let ticketsLocalRef = [...tickets];

        ticketsLocalRef.forEach((ticket, i) => {
            let combinedSupply = enteredCombined ? +ticket.supply + +getTicketQuantity(ticket.type) : ticket.supply;
            let chance = getTicketQuantity(ticket.type) / combinedSupply * ticket.items;
            // let chance = combinedSupply * 100 / getTicketQuantity(ticket.type);
            let percentage = (chance * 100).toFixed(1);
            let price = ticket.price;
            let cost = (getTicketQuantity(ticket.type) * price).toFixed(2);

            let wearables = countWearablesChance(ticket.wearables, ticket.items, chance.toFixed(2), combinedSupply);

            ticketsLocalRef[i] = {
                ...ticket,
                chance: chance > ticket.items ? `x${ticket.items.toFixed(2)}` :
                        chance > combinedSupply ? `x${combinedSupply.toFixed(2)}` :
                        chance > 1 ? `x${chance.toFixed(2)}` :
                        chance > 0 ? `${percentage}% for 1` : 0,
                cost: Math.round(cost) > Math.round(price) ? cost : price,
                entered: combinedSupply,
                wearables: wearables
            };
        });

        setTickets(ticketsLocalRef);
    }

    const countWearablesChance = (wearables, itemsAmount, chance, combinedSupply) => {
        wearables.forEach((wearable) => {
            let percentage = (wearable.amount * 100 / itemsAmount).toFixed(5);
            let wearableChance = percentage * chance / 100;
            let singleSupply = combinedSupply / 3;

            if(wearableChance > wearable.amount) {
                wearable.chance = `x${wearable.amount.toFixed(2)}`;
            } else if(wearableChance > singleSupply) {
                wearable.chance = singleSupply > 1 ? `x${singleSupply.toFixed(2)}` : `${(singleSupply * 100).toFixed(1)}% for 1`;;
            } else {
                wearable.chance = wearableChance > 1 ? `x${wearableChance.toFixed(2)}` : `${(wearableChance * 100).toFixed(1)}% for 1`;
            }
        });
        return wearables;
    };

    const loadTickets = () => {
        setSupplySpinner(true);

        thegraph.getRaffleData(raffle6TotalEnteredQuery()).then((response)=> {
            let data = response.data.total;
            let enteredArray = data === null ? [0,0,0,0,0,0] : [data.totalCommon, data.totalUncommon, data.totalRare, data.totalLegendary, data.totalMythical, data.totalGodLike];

            enteredArray.forEach((entered, i) => {
                ticketsCache[i].entered = entered;
                ticketsCache[i].supply = entered;
            });

            setTicketsCache(ticketsCache);
            setTickets(ticketsCache);
            setSupplySpinner(false);
        }).catch(error => console.log(error))

        // axios.get('https://api.ghst.gg/baazaar/tickets').then((response) => {
        //     let data = response.data;
        //     let supplyArray = [data.common, data.uncommon, data.rare, data.legendary, data.mythical, data.godlike];
        //     let enteredArray = [data.common_entered, data.uncommon_entered, data.rare_entered, data.legendary_entered, data.mythical_entered, data.godlike_entered];

        //     if (lastTicketInfo !== JSON.stringify(supplyArray)) {

        //         supplyArray.forEach((supply, i) => {
        //             ticketsCache[i].supply = supply;
        //             ticketsCache[i].entered = enteredArray[i];
        //         });

        //         setTicketsCache(ticketsCache);
        //         setTickets(ticketsCache);
        //         setLastTicketInfo(JSON.stringify(supplyArray));
        //         setSnackbarShowsOnFirstLoading(false);
        //     }
        //     setSupplySpinner(false);
        // });
    };

    const getAveragePrices = () => {
        setPricesSpinner(true);

        thegraph.getJoinedData([raffleTicketPriceQuery(0), raffleTicketPriceQuery(1), raffleTicketPriceQuery(2), raffleTicketPriceQuery(3), raffleTicketPriceQuery(4), raffleTicketPriceQuery(5)]) // raffle 4 queries
        // thegraph.getJoinedData([raffleTicketPriceQuery(6), rafflePortalsPriceQuery()])
            .then((response) => {
                // let ticketsWeiPrices = response[0].data.erc1155Listings.map((wei)=> parseInt(wei.priceInWei));
                // let portalsWeiPrices = response[1].data.erc721Listings.map((wei)=> parseInt(wei.priceInWei));

                // let ticketsFloorPrice = (ticketsWeiPrices.reduce((a,b) => a + b, 0) / ticketsWeiPrices.length) / 10**18;
                // let portalsFloorPrice = (portalsWeiPrices.reduce((a,b) => a + b, 0) / portalsWeiPrices.length) / 10**18;

                // ticketsCache[0].price = ticketsFloorPrice.toFixed(5);
                // ticketsCache[0].cost = ticketsFloorPrice.toFixed(5);
                // ticketsCache[0].portalsPrice = portalsFloorPrice.toFixed(0);

                let averagePrices = response.map((item)=> {
                    let prices = item.data.erc1155Listings.map((wei)=> parseInt(wei.priceInWei));
                    let average = prices.reduce((a,b) => a + b, 0) / prices.length;
                    let price = average / 10**18;
                    return price.toFixed(2);
                });

                averagePrices.forEach((price, i) => {
                    ticketsCache[i].price = price;
                    ticketsCache[i].cost = price;
                });

                setTickets(ticketsCache);
                setPricesSpinner(false);
            });
    }

    const onEnd = (id) => {
        setCurrentCountdown(currentCountdown+1);
    }

    useEffect(() => {
        loadTickets();
    },[]);

    useEffect(() => {
        countTicketsChance();
    },[enteredCombined]);

    useEffect(() => {
        getAveragePrices();
    },[ticketsCache]);

    useEffect(() => {
        onFieldChange();
    }, [commonQuantity, uncommonQuantity, rareQuantity, legendaryQuantity, mythicalQuantity, godlikeQuantity]);

    // useEffect(() => {
    //     onFieldChange();
    //     if (!snackbarShowsOnFirstLoading) {
    //         showSnackbar('success', 'Tickets supply was successfully updated!')
    //     }
    // }, [lastTicketInfo]);

    // useInterval(() => {
    //     loadTickets();
    // }, 180000);

    return (
        <Container maxWidth='lg' className={classes.raffle}>
            <Helmet>
                <title>Raffle Calculator</title>
            </Helmet>

            <Grid container alignContent={'center'} className={classes.titleWrapper}>
                <Grid item xs={12} md={6}>
                    <Typography variant='h4' className={classes.title}>
                        <Box component='span' position='relative'>
                            Raffle #5 calculator
                            { countdowns[currentCountdown].liveLabel ? (
                                <Box position='absolute' top='-18px' right='0' >
                                    <Typography color='primary' variant='subtitle1'>Live</Typography>
                                </Box>
                            ) : null}
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} className={classes.enterButtonWrapper}>
                    <Box display='flex' alignItems='center' justifyContent='flex-end'>
                        <Typography variant='h6' color='primary'>{countdowns[currentCountdown].text}</Typography>
                        <Box paddingTop='18px'>
                            {countdowns[currentCountdown].date && <Countdown date={countdowns[currentCountdown].date} format='dd:hh:mm:ss' onEnd={onEnd} key={currentCountdown} />}
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* <Box display='flex' justifyContent='center' textAlign='center' marginBottom='60px'>
                <Box margin='0 8px' flexBasis={180}>
                    <Button variant='outlined' color='primary' size='large' fullWidth>
                        Raffle 4
                    </Button>
                    <Typography variant='caption'>29.03.21 {'<=>'} 01.04.21</Typography>
                </Box>
                <Box margin='0 8px' flexBasis={180}>
                    <Button variant='contained' color='primary' size='large' fullWidth>
                        Raffle 5
                    </Button>
                    <Typography variant='caption'>05.09.21 {'<=>'} 08.09.21</Typography>
                </Box>
                <Box margin='0 8px' flexBasis={180}>
                    <Button variant='contained' color='primary' size='large' fullWidth disabled>
                        Raffle 6
                    </Button>
                    <Typography variant='caption'>24.09.21 {'<=>'} 28.09.21</Typography>
                </Box>
            </Box>

            <TabContext value={activeRaffle}>
                <Box textAlign='center'>
                    <TabList
                        onChange={onTabsChange}
                        variant='scrollable'
                        scrollButtons='auto'
                    >
                        <Tab label='Raffle 4' value='4' />
                        <Tab label='Raffle 5' value='5' />
                        <Tab label='Raffle 6' value='6' disabled />
                    </TabList>
                </Box>

                <TabPanel value='4'>
                    RAFFLE 4 Panel
                </TabPanel>
                <TabPanel value='5'>
                    RAFFLE 5 Panel
                </TabPanel>
                <TabPanel value='6'>
                    RAFFLE 6 Panel
                </TabPanel>
            </TabContext> */}
            
            <Box position='fixed' right={18} bottom={18} zIndex={10}>
                <Link href={'https://www.aavegotchi.com/raffle/5'} className={classes.enterButton} target={'_blank'} underline='none'>
                    <Button variant='contained' color='primary'>
                        Enter Raffle
                    </Button>
                </Link>
            </Box>

            <RaffleTable
                tickets={tickets}
                supplySpinner={supplySpinner}
                pricesSpinner={pricesSpinner}

                setCommonQuantity={setCommonQuantity}
                setUncommonQuantity={setUncommonQuantity}
                setRareQuantity={setRareQuantity}
                setLegendaryQuantity={setLegendaryQuantity}
                setMythicalQuantity={setMythicalQuantity}
                setGodlikeQuantity={setGodlikeQuantity}
                // enteredSupplyType={enteredSupplyType}
                // setEnteredSupplyType={setEnteredSupplyType}

                enteredCombined={enteredCombined}
                setEnteredCombined={setEnteredCombined}
            />
            <RaffleWearables tickets={tickets} />
        </Container>
    );
}