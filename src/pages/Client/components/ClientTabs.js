import React from 'react';
import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';
import { useRouteMatch } from 'react-router';
import { NavLink } from 'react-router-dom';

import gotchiPlaceholder from '../../../assets/images/logo.png';
import warehousePlaceholder from '../../../assets/wearables/15.svg';
import ticketsPlaceholder from '../../../assets/tickets/rare.svg';
import realmPlaceholder from '../../../assets/images/icons/kek.png';

const useStyles = makeStyles((theme) => ({
    button: {
        '&.active, &.active:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            '&.Mui-disabled': {
                backgroundColor: alpha(theme.palette.primary.main, .1),
            }
        }
    }
}));

export default function ClientTabs({clientActive, gotchisLength, warehouseLength, ticketsLength, realmLength}) {
    const match = useRouteMatch();
    const classes = useStyles();

    return (
        <Box display='flex' alignItems='flex-start' flexWrap='wrap'>

            <Button
                disabled={!gotchisLength}
                size='large'
                startIcon={
                    <img src={gotchiPlaceholder} alt='gotchi' width={25} style={{ marginRight: '4px' }} />
                }
                endIcon={`[${gotchisLength}]`}
                sx={{ marginRight: '12px' }}
                component={NavLink}
                className={classes.button}
                activeClassName='active'
                to={{ pathname: `${match.url}/gotchis`, search: `?address=${clientActive}` }}
            >
                Gotchis
            </Button>

            <Button
                disabled={!warehouseLength}
                size='large'
                startIcon={
                    <img src={warehousePlaceholder} alt='gotchi' width={25} style={{ marginRight: '4px' }} />
                }
                endIcon={`[${warehouseLength}]`}
                sx={{ marginRight: '12px' }}
                component={NavLink}
                className={classes.button}
                activeClassName='active'
                to={{ pathname: `${match.url}/warehouse`, search: `?address=${clientActive}` }}
            >
                Warehouse
            </Button>

            <Button
                disabled={!ticketsLength}
                size='large'
                startIcon={
                    <img src={ticketsPlaceholder} alt='gotchi' width={27} style={{ marginRight: '4px' }} />
                }
                endIcon={`[${ticketsLength}]`}
                sx={{ marginRight: '12px' }}
                component={NavLink}
                className={classes.button}
                activeClassName='active'
                to={{ pathname: `${match.url}/tickets`, search: `?address=${clientActive}` }}
            >
                Tickets
            </Button>

            <Button
                disabled={!realmLength}
                size='large'
                startIcon={
                    <img src={realmPlaceholder} alt='gotchi' width={27} />
                }
                endIcon={`[${realmLength}]`}
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