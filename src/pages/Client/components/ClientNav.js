import React, { useContext } from 'react';
import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';
import { useRouteMatch } from 'react-router';
import { NavLink } from 'react-router-dom';

import { ClientContext } from '../../../contexts/ClientContext';

import gotchiPlaceholder from '../../../assets/images/logo.png';
import warehousePlaceholder from '../../../assets/wearables/15.svg';
import ticketsPlaceholder from '../../../assets/tickets/rare.svg';
import realmPlaceholder from '../../../assets/images/icons/kek.png';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: '0 4px !important',
        paddingRight: '12px !important',
        paddingLeft: '12px !important',
        backgroundColor: `${alpha(theme.palette.secondary.dark, .4)} !important`,
        '&:hover': {
            backgroundColor: `${theme.palette.secondary.dark} !important`,
        },
        '&.Mui-disabled': {
            backgroundColor: `${alpha(theme.palette.secondary.dark, .2)} !important`,
        },
        '&.active, &.active:hover': {
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: theme.palette.secondary.main,
            '&.Mui-disabled': {
                backgroundColor: `${alpha(theme.palette.primary.main, .1)} !important`,
            }
        }
    }
}));

export default function ClientNav() {
    const match = useRouteMatch();
    const classes = useStyles();

    const { clientActive, gotchis, warehouse, tickets, realm } = useContext(ClientContext);

    return (
        <Box display='flex' alignItems='center' justifyContent='center' flexWrap='wrap'>

            <Button
                disabled={!gotchis.length}
                startIcon={
                    <img src={gotchiPlaceholder} alt='gotchi' width={20} style={{ marginRight: '4px' }} />
                }
                endIcon={`[${gotchis.length}]`}
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
                endIcon={`[${warehouse.length}]`}
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
                endIcon={`[${tickets.length}]`}
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
                endIcon={`[${realm.length}]`}
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