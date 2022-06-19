
import React, { useContext } from 'react';
import { Box, CircularProgress, Grid, TextField, Tooltip, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import classNames from 'classnames';
import { DateTime } from 'luxon';

import { GhstTokenGif } from 'components/Icons/Icons';
import { RaffleContext } from 'contexts/RaffleContext';
import { ItemUtils } from 'utils';
import { CommonUtils } from 'utils';

import { tableStyles } from '../styles';

export function RaffleTable() {
    const classes = tableStyles();

    const { raffle, tickets, setTickets, raffleSpinner, pricesSpinner, countChances, countWearablesChances } = useContext<any>(RaffleContext);

    const handleInputChange = (event: any, i: number) => {
        const newValue = event.target.value > 0 ? +event.target.value : '';

        setTickets((ticketsCache: any[]) => {
            const modified: any[] = [...ticketsCache];
            modified[i].value = newValue;
            modified[i].chance = countChances(newValue, modified[i].entered, modified[i].items);
            modified[i].prizes = countWearablesChances(modified[i]);

            return modified;
        });
    };

    return (
        <>
            <Grid container spacing={2} className={classes.row}>
                <Grid item xs={12} md={3} style={{ position: 'relative' }}>
                    <Typography variant='h6' className={classes.subtitle}>Your Entered Tickets</Typography>
                </Grid>

                <Grid container item spacing={1} xs={12} md={8} lg={9}>
                    {
                        tickets.map((ticket, i) => {
                            return <Grid item xs={4} sm={true} key={i}>
                                <Box maxWidth={200} margin='auto'>
                                    <TextField
                                        type='text'
                                        variant='outlined'
                                        value={ticket.value}
                                        fullWidth
                                        disabled={raffle.endDate - DateTime.local().toSeconds() < 0} // TODO check in the next Raffle is toSeconds ok
                                        className={classNames(classes.input, ticket.rarity)}
                                        label={CommonUtils.capitalize(ticket.rarity)}
                                        onChange={(event) => handleInputChange(event, i)}
                                    />
                                </Box>
                            </Grid>;
                        })
                    }
                </Grid>
            </Grid>

            <Grid container spacing={2} className={classes.row}>
                <Grid item xs={12} md={4} lg={3}>
                    <Typography variant='h6' className={classes.subtitle}>Items in Raffle</Typography>
                </Grid>

                <Grid container item spacing={1} xs={12} md={8} lg={9}>
                    {
                        tickets.map((ticket, i) => {
                            return <Grid item xs={4} sm={true} key={i}>
                                <Box textAlign='center' className={classNames(classes.textHighlight, ticket.rarity, classes.ticketVisual)}>
                                    {raffleSpinner ? (
                                        <CircularProgress color='inherit' size={20} style={{ bottom: -5, position: 'relative' }}/>
                                    ) : (
                                        <Typography
                                        variant='body1'
                                        align='center'
                                        className={classNames(classes.textHighlight, ticket.rarity, classes.tableValue)}
                                    >
                                        {CommonUtils.formatPrice(ticket.items)}
                                    </Typography>
                                    )}
                                </Box>
                            </Grid>;
                        })
                    }
                </Grid>
            </Grid>

            <Grid container spacing={2} className={classes.row}>
                <Grid item xs={12} md={4} lg={3} className={classes.toggleWrapper}>
                    <Typography variant='h6' className={classes.subtitle}>
                        Total tickets entered
                        <Tooltip
                            placement='right'
                            arrow
                            enterTouchDelay={0}
                            title={
                                <React.Fragment>
                                    <Typography>Total number of entered tickets</Typography>
                                </React.Fragment>
                            }
                        >
                            <HelpOutlineIcon fontSize='small' className={classes.subtitleIcon} />
                        </Tooltip>
                    </Typography>
                </Grid>

                <Grid container item spacing={1} xs={12} md={8} lg={9}>
                    {
                        tickets.map((ticket: any, i: number) => {
                             // TODO check in the next Raffle is toSeconds ok
                            const totalEntered = raffle.endDate - DateTime.local().toSeconds() < 0 ? ticket.entered : +ticket.entered + +ticket.value;

                            return <Grid item xs={4} sm={true} key={i} className={classes.ticketBg}>
                                <img src={ItemUtils.getTicketImg(ticket.rarity)} alt={'ticket-' + ticket.rarity} />
                                <Box textAlign='center' className={classNames(classes.textHighlight, ticket.rarity, classes.ticketVisual)}>
                                    {raffleSpinner ? (
                                        <CircularProgress color='inherit' size={20} style={{ bottom: -5, position: 'relative' }}/>
                                    ) : (
                                        <Typography
                                            variant='body1'
                                            align='center'
                                            className={classNames(classes.tableValue, classes.price)}
                                        >
                                            {CommonUtils.formatPrice(totalEntered)}
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>;
                        })
                    }
                </Grid>
            </Grid>

            <Grid container spacing={2} className={classes.row}>
                <Grid item xs={12} md={4} lg={3}>
                    <Typography variant='h6' className={classes.subtitle}>
                        Total tickets entered (in FRENs)
                        <Tooltip
                            placement='right'
                            arrow
                            enterTouchDelay={0}
                            title={
                                <React.Fragment>
                                    <Typography>Total amount of frens spent to the tickets</Typography>
                                </React.Fragment>
                            }
                        >
                            <HelpOutlineIcon fontSize='small' className={classes.subtitleIcon} />
                        </Tooltip>
                    </Typography>
                </Grid>

                <Grid container item spacing={1} xs={12} md={8} lg={9}>
                    {
                        tickets.map((ticket: any, i: number) => {
                            return <Grid item xs={4} sm={true} key={i} className={classNames(classes.chance, ticket.rarity)}>
                                <Box textAlign='center' className={classNames(classes.textHighlight, ticket.rarity, classes.ticketVisual)}>
                                    {raffleSpinner ? (
                                        <CircularProgress color='inherit' size={20} style={{ bottom: -5, position: 'relative' }}/>
                                    ) : (
                                        <Typography
                                            variant='body1'
                                            align='center'
                                            className={classNames(classes.tableValue, classes.price)}
                                        >
                                            {CommonUtils.formatPrice(ticket.entered * ItemUtils.getTicketFrensPrice(ticket.rarity))}
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>;
                        })
                    }
                </Grid>
            </Grid>

            <Grid container spacing={2} className={classes.row}>
                <Grid item xs={12} md={4} lg={3}>
                    <Typography variant='h6' className={classes.subtitle}>
                        Your tickets price
                        <Tooltip
                            placement='right'
                            arrow
                            enterTouchDelay={0}
                            title={
                                <React.Fragment>
                                    <Typography>Average ticket price on Baazaar for the last 5 trades</Typography>
                                </React.Fragment>
                            }
                        >
                            <HelpOutlineIcon fontSize='small' className={classes.subtitleIcon} />
                        </Tooltip>
                    </Typography>
                </Grid>

                <Grid container item spacing={1} xs={12} md={8} lg={9}>
                    {
                        tickets.map((ticket: any, i: number) => {
                            return <Grid item xs={4} sm={true} key={i}>
                                <Box textAlign='center' className={classNames(classes.textHighlight, ticket.rarity)}>
                                    {pricesSpinner ? (
                                        <CircularProgress color='inherit' size={20} />
                                    ) : (
                                        <Typography
                                            variant='body1'
                                            align='center'
                                            className={classNames(classes.tableValue, classes.price)}
                                        >
                                            {CommonUtils.formatPrice(ticket.value > 0 ? ticket.price * ticket.value : ticket.price)}
                                            <GhstTokenGif width={26} height={26} />
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>;
                        })
                    }
                </Grid>
            </Grid>

            <Grid container spacing={2} className={classes.row}>
                <Grid item xs={12} md={4} lg={3}>
                    <Typography variant='h6' className={classes.subtitle}>
                        Your chance
                        <Tooltip
                            placement='right'
                            arrow
                            enterTouchDelay={0}
                            title={
                                <React.Fragment>
                                    <Typography>How many items you will get on average</Typography>
                                </React.Fragment>
                            }
                        >
                            <HelpOutlineIcon fontSize='small' className={classes.subtitleIcon} />
                        </Tooltip>
                    </Typography>
                </Grid>

                <Grid container item spacing={1} xs={12} md={8} lg={9}>
                    {
                        tickets.map((ticket: any, i: number) => {
                            return <Grid item xs={4} sm={true} key={i} style={{ paddingLeft: 0 }}>
                                <Box maxWidth={200} margin='auto' className={classNames(classes.chance, ticket.rarity, ticket.chance !== 0 ? 'highlighted' : '')}>
                                    <Typography
                                        variant='body1'
                                        align='center'
                                        className={classNames(classes.textHighlight, ticket.rarity, classes.tableValue)}
                                    >
                                        {ticket.chance ? CommonUtils.formatChance(ticket.chance, ticket.items) : 0}
                                    </Typography>
                                </Box>
                            </Grid>;
                        })
                    }
                </Grid>
            </Grid>
        </>
    );
}
