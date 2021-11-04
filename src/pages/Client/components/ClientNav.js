import React, { useContext } from 'react';
import { Box, Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useRouteMatch } from 'react-router';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';
import { NavLink } from 'react-router-dom';

import { ClientContext } from '../../../contexts/ClientContext';

import gotchiPlaceholder from '../../../assets/images/logo.png';
import warehousePlaceholder from '../../../assets/wearables/15.svg';
import ticketsPlaceholder from '../../../assets/tickets/rare.svg';
import realmPlaceholder from '../../../assets/images/icons/kek.png';
import ContentLoader from 'react-content-loader';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: '0 4px !important',
        paddingRight: '12px !important',
        paddingLeft: '12px !important',
        color: '#fff !important',
        border: `2px solid ${alpha(theme.palette.primary.main, .2)} !important`,
        backgroundColor: `${alpha(theme.palette.secondary.dark, .4)} !important`,
        '&:hover': {
            backgroundColor: `${theme.palette.secondary.dark} !important`,
        },
        '&.Mui-disabled': {
            backgroundColor: `${alpha(theme.palette.secondary.dark, .2)} !important`,
            borderColor: `${alpha(theme.palette.secondary.light, .2)} !important`,
            color: `${alpha('#fff', .3)} !important`,
            '& $label': {
                opacity: .4
            }
        },
        '&.active, &.active:hover': {
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: `${theme.palette.secondary.main} !important`,
            '&.Mui-disabled': {
                backgroundColor: `${alpha(theme.palette.primary.main, .1)} !important`,
                color: `${alpha('#fff', .2)} !important`,
                '& $label': {
                    color: `${theme.palette.primary.main} !important`,
                }
            },
            '& $label': {
                color: theme.palette.secondary.main,
            }
        }
    },
    label: {
        fontSize: '14px !important',
        fontWeight: 600,
        color: theme.palette.primary.main
    }
}));

export default function ClientNav() {
    const match = useRouteMatch();
    const classes = useStyles();
    const theme = useTheme();

    const { 
        clientActive,
        gotchis, loadingGotchis,
        warehouse, loadingWarehouse,
        tickets, loadingTickets,
        realm, loadingRealm
     } = useContext(ClientContext);

    return (
        <Box display='flex' alignItems='center' justifyContent='center' flexWrap='wrap'>

            <Button
                disabled={!gotchis.length}
                startIcon={
                    <img src={gotchiPlaceholder} alt='gotchi' width={20} style={{ marginRight: '4px' }} />
                }
                endIcon={
                    loadingGotchis ? (
                        <ContentLoader
                            speed={2}
                            width={28}
                            height={12}
                            viewBox='0 0 28 14'
                            backgroundColor={theme.palette.secondary.main}
                            foregroundColor={theme.palette.primary.dark}
                        >
                            <rect x='0' y='0' width='28' height='14' />
                        </ContentLoader>
                    ) : (
                        <span className={classes.label}>[{gotchis.length}]</span>
                    )
                }
                component={NavLink}
                className={classes.button}
                activeClassName='active'
                to={{ pathname: `${match.url}/gotchis`, search: `?address=${clientActive}` }}
            >
                Gotchis
            </Button>

            <Button
                disabled={!warehouse.length}
                startIcon={
                    <img src={warehousePlaceholder} alt='gotchi' width={25} style={{ marginRight: '4px' }} />
                }
                endIcon={
                    loadingGotchis || loadingWarehouse ? (
                        <ContentLoader
                            speed={2}
                            width={28}
                            height={14}
                            viewBox='0 0 28 14'
                            backgroundColor={theme.palette.secondary.main}
                            foregroundColor={theme.palette.primary.dark}
                        >
                            <rect x='0' y='0' width='28' height='14' />
                        </ContentLoader>
                    ) : (
                        <span className={classes.label}>[{warehouse.length}]</span>
                    )
                }
                component={NavLink}
                className={classes.button}
                activeClassName='active'
                to={{ pathname: `${match.url}/warehouse`, search: `?address=${clientActive}` }}
            >
                Warehouse
            </Button>

            <Button
                disabled={!tickets.length}
                startIcon={
                    <img src={ticketsPlaceholder} alt='gotchi' width={22} style={{ marginRight: '4px' }} />
                }
                endIcon={
                    loadingTickets ? (
                        <ContentLoader
                            speed={2}
                            width={30}
                            height={14}
                            viewBox='0 0 28 14'
                            backgroundColor={theme.palette.secondary.main}
                            foregroundColor={theme.palette.primary.dark}
                        >
                            <rect x='0' y='0' width='28' height='14' />
                        </ContentLoader>
                    ) : (
                        <span className={classes.label}>[{tickets.length}]</span>
                    )
                }
                component={NavLink}
                className={classes.button}
                activeClassName='active'
                to={{ pathname: `${match.url}/tickets`, search: `?address=${clientActive}` }}
            >
                Tickets
            </Button>

            <Button
                disabled={!realm.length}
                startIcon={
                    <img src={realmPlaceholder} alt='gotchi' width={20} />
                }
                endIcon={
                    loadingRealm ? (
                        <ContentLoader
                            speed={2}
                            width={28}
                            height={14}
                            viewBox='0 0 28 14'
                            backgroundColor={theme.palette.secondary.main}
                            foregroundColor={theme.palette.primary.dark}
                        >
                            <rect x='0' y='0' width='28' height='14' />
                        </ContentLoader>
                    ) : (
                        <span className={classes.label}>[{realm.length}]</span>
                    )
                }
                component={NavLink}
                className={classes.button}
                activeClassName='active'
                to={{ pathname: `${match.url}/realm`, search: `?address=${clientActive}` }}
            >
                Realm
            </Button>
        </Box>
    );
}