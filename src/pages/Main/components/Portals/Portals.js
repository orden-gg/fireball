import React, { useEffect, useState } from 'react';
import styles from "./styles";
import { Link } from 'react-router-dom';
import { Box, CircularProgress, Grid } from '@mui/material';
import thegraph from '../../../../api/thegraph';
import commonUtils from '../../../../utils/commonUtils';
import { portalsQuery } from './queries';
import openedPortal from '../../../../assets/images/portal-opened.gif';
import sealedPortal from '../../../../assets/images/portal-sealed.svg';
import classNames from 'classnames';

export default function Portals() {
    const classes = styles();
    const [dataSpinner, setDataSpinner] = useState(true);
    const [openedPortals, setOpenedPortals] = useState(0);
    const [gotchiClaimed, setGotchiClaimed] = useState(0);
    const [eegg, setEegg] = useState(false);

    const portalsAmount = 25000;

    useEffect(() => {
        getGraphData();
    }, []);

    const getGraphData = () => {
        setDataSpinner(true);
        thegraph.getData(portalsQuery)
            .then((response) => {
                setOpenedPortals(response.data.statistic.portalsOpened);
                setGotchiClaimed(response.data.statistic.aavegotchisClaimed);
                setDataSpinner(false);
            });
    };

    
    const getSealedPortals = () => {
        return commonUtils.formatNumber(portalsAmount - openedPortals);
    };
    
    const getOpenedPortalsPercentage = () => {
        return (openedPortals / portalsAmount * 100).toFixed(2);
    };

    function onPortalClick() {
        setEegg(!eegg);
    }

    return (
        <Grid
            container
            alignItems='center'
            justifyContent='center'
        >
            <Grid className={classes.portalsColumn} item xs={12} md={4}>
                <Box className={classes.portalsDescr}>
                    {dataSpinner ? (
                        <CircularProgress component='span' className={classes.highlight} size={22}/>
                    ) : (
                        <Box component='span' className={classes.highlight}>
                            { eegg ? getSealedPortals() : `${getOpenedPortalsPercentage()}%` }
                        </Box>
                    )}
                    <Box component='span'>
                        { eegg ? `/${commonUtils.formatNumber(portalsAmount)} are sealed!` : ' portals are opened!' }
                    </Box>
                </Box>
            </Grid>
            <Grid className={classNames(classes.portalsColumn, 'center')} container item xs={12} md={2}>
                <img
                  src={eegg ? sealedPortal : openedPortal }
                  className={classes.portalsImage}
                  onClick={onPortalClick}
                  alt='Portal'
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <Box className={classes.portalsDescr}>
                    {dataSpinner ? (
                        <CircularProgress component='span' className={classes.highlight} size={22}/>
                    ) : (
                        <Box component='span' className={classes.highlight}>
                            {commonUtils.formatNumber(gotchiClaimed)}
                        </Box>
                    )}
                    <Box component='span'> gotchis are summoned </Box>
                    <Link className={classes.explorerLink} to='/explorer'>Aavegotchi Explorer</Link>
                </Box>
            </Grid>
        </Grid>
    );
}