import React from 'react';
import { Grid, Box, Typography, FormControl, Select, InputLabel, MenuItem, useTheme, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
// import thegraph from '../../../api/thegraph';
// import graphUtils from '../../../utils/graphUtils';
// import commonUtils from '../../../utils/commonUtils';
// import classNames from 'classnames';
// import ghst from '../../../assets/images/ghst-doubleside.gif';

import Gotchi from '../../../components/Gotchi/Gotchi';
import Item from '../../../components/Item/Item';
import Subtitle from '../../../components/Subtitle/Subtitle';

// import { useMoralis } from "react-moralis";

const useStyles = makeStyles((theme) => ({
    textHighlight: {
        color: theme.palette.primary.main,
        marginLeft: 10
    },
}));


export default function ClientContent({addresses, gotchies, gotchiesFilter, inventory, inventoryFilter,
                                       onGotchiesSort, onInventorySort, isDataLoading}) {
    const classes = useStyles();
    const theme = useTheme();

    // const [totalReward, setTotalReward] = useState(0);
    const showPlaceholder = addresses.length !== 0 && !isDataLoading();

    // const calculateReward = () => {
    //     setIsRewardCalculating(true);
    //     thegraph.getAllGotchies().then((allGotchies)=>{
    //         let rscLeaders = commonUtils.basicSort(allGotchies, 'withSetsRarityScore');
    //         let kinLeaders = commonUtils.basicSort(allGotchies, 'kinship');
    //         let expLeaders = commonUtils.basicSort(allGotchies, 'experience');

    //         gotchies.forEach((item, index)=>{
    //             let resRew = graphUtils.calculateRewards(rscLeaders.findIndex(x => x.id === item.id), 'RSC');
    //             let kinRew = graphUtils.calculateRewards(kinLeaders.findIndex(x => x.id === item.id), 'KIN');
    //             let expRew = graphUtils.calculateRewards(expLeaders.findIndex(x => x.id === item.id), 'EXP');

    //             gotchies[index] = {
    //                 ...item,
    //                 rscRew: resRew,
    //                 kinRew: kinRew,
    //                 expRew: expRew,
    //                 totalRew: resRew + kinRew + expRew
    //             }
    //         });

    //         setTotalReward(gotchies.reduce((prev, next) => prev + next.totalRew, 0));
    //         setIsRewardCalculating(false);
    //     });
    // };

    const renderGotchiesHead = () => {
        if(gotchies.length !== 0) {
            return (
                <Box marginBottom='16px'>
                    <Subtitle margin='12px 0 20px'>
                        <Box bgcolor='primary.main' color='secondary.main' component='span' padding='1px 4px' marginRight='8px' borderRadius='4px'>
                            {gotchies.length}
                        </Box>
                        Gotchi{gotchies.length !== 1 ? `'s` : ''}
                    </Subtitle>
                    <Box maxWidth={300}>
                        <FormControl variant='outlined' size={'small'} className={classes.formControl} fullWidth>
                            <InputLabel>Order by:</InputLabel>
                            <Select
                                label={'Order by:'}
                                value={gotchiesFilter}
                                onChange={onGotchiesSort}
                            >
                                {/*<MenuItem value={'totalRew'}>Current reward</MenuItem>*/}
                                <MenuItem value={'withSetsRarityScore'}>RS (modified)</MenuItem>
                                <MenuItem value={'baseRarityScore'}>RS (base)</MenuItem>
                                <MenuItem value={'kinship'}>KIN</MenuItem>
                                <MenuItem value={'experience'}>EXP</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            )
        } else if (showPlaceholder) {
            return (
                <Typography
                    align={'center'}
                    variant={'h6'}
                    color={'primary'}
                >
                    No gotchies here :( <br/> Grab some frens at 
                    <Link
                        href='https://www.aavegotchi.com/baazaar/aavegotchis?sort=latest'
                        target='_blank'
                        underline='none'
                        style={{ marginLeft: '10px', color: 'red' }}
                    >
                        Baazaar
                    </Link>
                </Typography>
            )
        } else {
            return null;
        }
    }

    const renderInventoryHead = () => {
        if(inventory.length !== 0) {
            return (
                <Box marginBottom='16px'>
                    <Subtitle margin='12px 0 20px'>
                        <Box bgcolor='primary.main' color='secondary.main' component='span' padding='1px 4px' marginRight='8px' borderRadius='4px'>
                            {inventory.length}
                        </Box>
                        Item{inventory.length !== 1 ? `'s` : ''}
                    </Subtitle>
                    <Box maxWidth={300}>
                        <FormControl variant='outlined' size={'small'} className={classes.formControl} fullWidth>
                            <InputLabel>Order by:</InputLabel>
                            <Select
                                label={'Order by:'}
                                value={inventoryFilter}
                                onChange={onInventorySort}
                            >
                                <MenuItem value={'desc'}>Rarity (godlike {'->'} common)</MenuItem>
                                <MenuItem value={'asc'}>Rarity (common {'->'} godlike)</MenuItem>
                                <MenuItem value={'balance'}>Quantity</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            )
        } else if (showPlaceholder) {
            return (
                <Typography
                    align={'center'}
                    variant={'h6'}
                    color={'primary'}
                    style={{marginTop: 20}}
                >
                    Inventory is empty
                </Typography>
            )
        } else {
            return null;
        }
    }

    // const renderRewardPaper = () => {
    //     if(totalReward !== 0) {
    //         return (
    //             <Grid item xs={12} md={6}>
    //                 <Paper variant='outlined' align='center' style={{padding: 12}}>
    //                     <Typography align={'center'} variant={'h6'}>
    //                         Total Reward >=>
    //                         <Box className={classNames(classes.textHighlight, classes.tokenValue)} component={'span'}>
    //                             {totalReward}
    //                             <img src={ghst} width='26' alt='GHST Token Icon' />
    //                         </Box>
    //                     </Typography>
    //                 </Paper>
    //             </Grid>
    //         )
    //     } else {
    //         return null;
    //     }
    // }

    if (addresses.length === 0) {
        return null;
    }

    const getAddressColor = (owner) => {
        let index = addresses.map((item)=>item.toLowerCase()).indexOf(owner) + 1;
        return index ? theme.palette.accounts[`color${index}`] : theme.palette.accounts.color1;
    };

    // const { Moralis , isInitialized} = useMoralis();
    // const [svg, setSvg] = useState('');
    // const [isLoaded, setIsLoaded] = useState(false);

    // if(isInitialized) {
    //     GotchiSvgRender.getSvg(gotchi.numericTraits, gotchi.equippedWearables, Moralis).then((result) => {
    //         setSvg(result)
    //     });
    // }

    return (
        <Box>
            {/* <Grid container alignItems={'center'} spacing={2} style={{marginBottom: 12, minHeight: 74}}>
                <Grid item xs={12} md={6}>
                    <Button
                        variant={'contained'}
                        size={'large'}
                        onClick={calculateReward}
                        style={{marginRight: 16}}
                    >
                        Calculate Reward
                    </Button>
                    <Button
                        disabled={true}
                        color={'primary'}
                        variant={'contained'}
                        size={'large'}
                    >
                        Get Support
                    </Button>
                </Grid>
                {renderRewardPaper()}
            </Grid> */}

            {renderGotchiesHead()}

            <Grid container spacing={2}>
                {
                    gotchies.map((gotchi, i)=>{
                        return <Grid item xs={6} sm={4} md={3} lg={2} key={i}>
                            <Gotchi gotchi={gotchi} gotchiColor={getAddressColor(gotchi.owner.id)} />
                        </Grid>
                    })
                }
            </Grid>

            {renderInventoryHead()}

            <Grid container spacing={2}>
                {
                    inventory.map((item, i)=>{
                        return <Grid item xs={6} sm={4} md={3} lg={2} key={i}>
                            <Item item={item} owners={true}/>
                        </Grid>
                    })
                }
            </Grid>
        </Box>
    );
}