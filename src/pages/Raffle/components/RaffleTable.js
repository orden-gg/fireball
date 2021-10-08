
import React from 'react';
import { Box, Checkbox, CircularProgress, FormControlLabel, Grid, TextField, Tooltip, Typography } from '@mui/material';
import classNames from 'classnames';
import {useStyles} from '../styles';
import commonUtils from '../../../utils/commonUtils';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import ghst from '../../../assets/images/ghst-doubleside.gif';

export default function RaffleTable({tickets, supplySpinner, pricesSpinner, setCommonQuantity, setUncommonQuantity,
                                        setRareQuantity, setLegendaryQuantity, setMythicalQuantity, setGodlikeQuantity, enteredCombined, setEnteredCombined}) {
    const classes = useStyles();

    const getTicketIconPath = (iconId) => {
        return require(`../../../assets/tickets/${iconId}.svg`).default;
    };

    const handleTicketsEnter = (event) => {
        setEnteredCombined(!event.target.checked);
    };
    
    return (
        <Grid item>
            <Grid container alignItems='center' justifyContent='space-between' spacing={2} className={classes.row}>
                <Grid item xs={12} md={3} style={{ position: 'relative' }}>
                    <Typography variant='h6' className={classes.subtitle}>Your Tickets</Typography>
                    <Box className={classes.countEnteredCheckboxWrapper}>
                        <FormControlLabel
                            className={classes.countEnteredCheckbox}
                            control={
                                <Checkbox checked={!enteredCombined} onChange={handleTicketsEnter} color='primary' name='enteredCombined' size='small' />
                            }
                            label='Count as entered'
                        />
                    </Box>
                </Grid>
                <Grid container item spacing={1} xs={12} md={8} lg={9}>
                    <Grid item xs={4} sm={true}>
                        <TextField
                            type='number'
                            variant='outlined'
                            fullWidth
                            className={classNames(classes.input, 'common')}
                            label={'Common'}
                            onChange={(event) => {
                                setCommonQuantity(event.target.value > 0 ? event.target.value : 0);
                            }}
                        />
                    </Grid>
                    <Grid item xs={4} sm={true}>
                        <TextField
                            type='number'
                            variant='outlined'
                            fullWidth
                            className={classNames(classes.input, 'uncommon')}
                            label={'Uncommon'}
                            onChange={(event) => {
                                setUncommonQuantity(event.target.value > 0 ? event.target.value : 0);
                            }}
                        />
                    </Grid>
                    <Grid item xs={4} sm={true}>
                        <TextField
                            type='number'
                            variant='outlined'
                            fullWidth
                            className={classNames(classes.input, 'rare')}
                            label={'Rare'}
                            onChange={(event) => {
                                setRareQuantity(event.target.value > 0 ? event.target.value : 0);
                            }}
                        />
                    </Grid>
                    <Grid item xs={4} sm={true}>
                        <TextField
                            type='number'
                            variant='outlined'
                            fullWidth
                            className={classNames(classes.input, 'legendary')}
                            label={'Legendary'}
                            onChange={(event) => {
                                setLegendaryQuantity(event.target.value > 0 ? event.target.value : 0);
                            }}
                        />
                    </Grid>
                    <Grid item xs={4} sm={true}>
                        <TextField
                            type='number'
                            variant='outlined'
                            fullWidth
                            className={classNames(classes.input, 'mythical')}
                            label={'Mythical'}
                            onChange={(event) => {
                                setMythicalQuantity(event.target.value > 0 ? event.target.value : 0);
                            }}
                        />
                    </Grid>
                    <Grid item xs={4} sm={true}>
                        <TextField
                            type='number'
                            variant='outlined'
                            fullWidth
                            className={classNames(classes.input, 'godlike')}
                            label={'Godlike'}
                            onChange={(event) => {
                                setGodlikeQuantity(event.target.value > 0 ? event.target.value : 0);
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container alignItems='center' justifyContent='space-between' spacing={2} className={classes.row}>
                <Grid item xs={12} md={4} lg={3}>
                    <Typography variant='h6' className={classes.subtitle}>Items in Raffle</Typography>
                </Grid>
                <Grid container item spacing={1} xs={12} md={8} lg={9}>
                    {
                        tickets.map((ticket, i) => {
                            return <Grid item xs={4} sm={true} key={i}>
                                <Typography
                                    variant='body1'
                                    align='center'
                                    className={classNames(classes.textHighlight, ticket.type, classes.tableValue)}
                                >
                                    {commonUtils.formatNumber(ticket.items)}
                                </Typography>
                            </Grid>
                        })
                    }
                </Grid>
            </Grid>
            <Grid container alignItems='center' justifyContent='space-between' spacing={2} className={classes.row}>
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
                    {/* <ToggleButtonGroup
                        value={enteredSupplyType}
                        exclusive
                        onChange={handleTicketsSupply}
                        aria-label='tickets supply'
                        size='small'
                        className={classes.toggleButtonWrapper}
                    >
                        <ToggleButton className={classes.toggleButton} value={true} aria-label='entered supply'>
                            Entered
                        </ToggleButton>
                        <ToggleButton className={classes.toggleButton} value={false} aria-label='all supply'>
                            All
                        </ToggleButton>
                    </ToggleButtonGroup> */}
                </Grid>
                <Grid container item spacing={1} xs={12} md={8} lg={9}>
                    {
                        tickets.map((ticket, i) => {
                            return <Grid item xs={4} sm={true} key={i} className={classes.ticketBg}>
                                <img src={getTicketIconPath(ticket.type)} alt={'ticket-' + ticket.type} />
                                <Box textAlign='center' className={classNames(classes.textHighlight, ticket.type, classes.ticketVisual)}>
                                    {supplySpinner ? (
                                        <CircularProgress color="inherit" size={20} style={{bottom: -5, position: 'relative'}}/>
                                    ) : (
                                        <Typography
                                            variant='body1'
                                            align='center'
                                            className={classNames(classes.tableValue, classes.price)}
                                        >
                                            {commonUtils.formatNumber(ticket.entered)}
                                            {/* {enteredSupplyType ? (
                                                <Box component={'span'} className={classes.enteredValue}>
                                                    <Box component={'span'}>
                                                        {commonUtils.formatNumber(ticket.entered)}
                                                    </Box>
                                                    <Box component={'span'} className={classNames(classes.enteredValuePerc, 'perc')}>
                                                        {(ticket.entered * 100 / ticket.supply).toFixed(1)} %
                                                    </Box>
                                                </Box>

                                            ) : (
                                                commonUtils.formatNumber(ticket.supply)
                                            )} */}
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                        })
                    }
                </Grid>
            </Grid>
            <Grid container alignItems='center' justifyContent='space-between' spacing={2} className={classes.row}>
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
                        tickets.map((ticket, i) => {
                            return <Grid item xs={4} sm={true} key={i} className={classNames(classes.chance, ticket.type)}>
                                <Box textAlign='center' className={classNames(classes.textHighlight, ticket.type, classes.ticketVisual)}>
                                    {supplySpinner ? (
                                        <CircularProgress color="inherit" size={20} style={{bottom: -5, position: 'relative'}}/>
                                    ) : (
                                        <Typography
                                            variant='body1'
                                            align='center'
                                            className={classNames(classes.tableValue, classes.price)}
                                        >
                                            {commonUtils.formatNumber(ticket.entered * ticket.priceInFrens)}
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                        })
                    }
                </Grid>
            </Grid>
            <Grid container alignItems='center' justifyContent='space-between' spacing={2} className={classes.row}>
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
                        tickets.map((ticket, i) => {
                            return <Grid item xs={4} sm={true} key={i}>
                                <Box textAlign='center' className={classNames(classes.textHighlight, ticket.type)}>
                                    {pricesSpinner ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : (
                                        <Typography
                                            variant='body1'
                                            align='center'
                                            className={classNames(classes.tableValue, classes.price)}
                                        >
                                            {ticket.cost}
                                            <img src={ghst} width='26' alt='GHST Token Icon' />
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                        })
                    }
                </Grid>
            </Grid>
            <Grid container alignItems='center' justifyContent='space-between' spacing={2} className={classes.row}>
                <Grid item xs={12} md={4} lg={3}>
                    <Typography variant='h6' className={classes.subtitle}>
                        Your reward
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
                        tickets.map((ticket, i) => {
                            return <Grid item xs={4} sm={true} key={i} className={classNames(classes.chance, ticket.type, ticket.chance !== 0 ? 'highlighted' : '')}>
                                <Typography
                                    variant='body1'
                                    align='center'
                                    className={classNames(classes.textHighlight, ticket.type, classes.tableValue)}
                                >
                                    {ticket.chance}
                                </Typography>
                            </Grid>
                        })
                    }
                </Grid>
            </Grid>
            {/* <Grid container alignItems='center' justifyContent='space-between' spacing={2} className={classes.row}>
                <Grid item xs={12} md={4} lg={3}>
                    <Typography variant='h6' className={classes.subtitle}>
                        Raffle profitability
                        <Tooltip
                            placement='right'
                            arrow
                            enterTouchDelay={0}
                            title={
                                <React.Fragment>
                                    <Typography>How profitable is the raffle based on the baazaar floor prices</Typography>
                                </React.Fragment>
                            }
                        >
                            <HelpOutlineIcon fontSize='small' className={classes.subtitleIcon} />
                        </Tooltip>
                    </Typography>
                </Grid>
                <Grid container item spacing={1} xs={12} md={8} lg={9}>
                    {
                        tickets.map((ticket, i) => {
                            return <Grid item xs={4} sm={true} key={i} className={classNames(classes.textHighlight, ticket.type, ticket.chance !== 0 ? 'highlighted' : '')}>
                                <Box textAlign='center'>
                                    {pricesSpinner ? (
                                        <CircularProgress color='inherit' size={20} />
                                    ) : (
                                        <Typography
                                            variant='body1'
                                            align='center'
                                            className={classNames(classes.tableValue, classes.price)}
                                        >
                                            {countProfit() > 0 ?
                                                <Box component='span' style={{ color: '#4caf50' }}>
                                                    +{countProfit()}%
                                                </Box>
                                                : countProfit() < 0 ?
                                                <Box component='span' style={{ color: '#f44336' }}>
                                                    {countProfit()}%
                                                </Box>
                                                : 0
                                            }
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                        })
                    }
                </Grid>
            </Grid> */}
        </Grid>
    );
}