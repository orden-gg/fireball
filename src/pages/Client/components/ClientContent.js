import React from 'react';
import { Grid, Box, Typography, FormControl, Select, InputLabel, MenuItem, useTheme, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Gotchi from '../../../components/Gotchi/Gotchi';
import Item from '../../../components/Item/Item';
import Subtitle from '../../../components/Subtitle/Subtitle';

const useStyles = makeStyles((theme) => ({
    textHighlight: {
        color: theme.palette.primary.main,
        marginLeft: 10
    },
}));

export default function ClientContent({signedInAddress, gotchies, gotchiesFilter, inventory, inventoryFilter,
                                       onGotchiesSort, onInventorySort, isDataLoading}) {
    const classes = useStyles();
    const theme = useTheme();
    const showPlaceholder = signedInAddress && !isDataLoading();

    const renderGotchiesHead = () => {
        if (gotchies.length !== 0) {
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
        if (inventory.length !== 0) {
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

    if (!signedInAddress) {
        return null;
    }

    const getAddressColor = () => {
        return theme.palette.accounts.color1;
    };

    return (
        <Box>
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