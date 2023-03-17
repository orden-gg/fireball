import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, CircularProgress, Grid } from '@mui/material';

import classNames from 'classnames';

import { TheGraphApi } from 'api/thegraph.api';

import { H1OpenedPortalGif, H1SealedPortalIcon } from 'components/Icons/Icons';

import { CommonUtils } from 'utils';

import { portalsQuery } from './queries';
import { styles } from './styles';

export function Portals() {
  const classes = styles();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openedPortals, setOpenedPortals] = useState<number>(0);
  const [gotchiClaimed, setGotchiClaimed] = useState<number>(0);
  const [eegg, setEegg] = useState<boolean>(false);

  const portalsAmount = 25000;

  useEffect(() => {
    getGraphData();
  }, []);

  const getGraphData = (): void => {
    setIsLoading(true);

    TheGraphApi.getData(portalsQuery).then((response: CustomAny) => {
      setOpenedPortals(response.data.statistic.portalsOpened);
      setGotchiClaimed(response.data.statistic.aavegotchisClaimed);
      setIsLoading(false);
    });
  };

  const getSealedPortals = (): string => {
    return CommonUtils.formatNumber(portalsAmount - openedPortals);
  };

  const getOpenedPortalsPercentage = (): string => {
    return ((openedPortals / portalsAmount) * 100).toFixed(2);
  };

  function onPortalClick(): void {
    setEegg(!eegg);
  }

  return (
    <Grid container alignItems='center' justifyContent='center'>
      <Grid className={classes.portalsColumn} item xs={12} md={4}>
        <Box className={classes.portalsDescr}>
          {isLoading ? (
            <CircularProgress className={classes.highlight} size={22} />
          ) : (
            <Box component='span' className={classes.highlight}>
              {eegg ? getSealedPortals() : `${getOpenedPortalsPercentage()}%`}
            </Box>
          )}
          <Box component='span'>
            {eegg ? `/${CommonUtils.formatNumber(portalsAmount)} are sealed!` : ' portals are opened!'}
          </Box>
        </Box>
      </Grid>
      <Grid className={classNames(classes.portalsColumn, 'center')} container item xs={12} md={2}>
        <div className={classes.portalsImage} onClick={onPortalClick}>
          {eegg ? <H1SealedPortalIcon width={150} height={150} /> : <H1OpenedPortalGif width={150} height={150} />}
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box className={classes.portalsDescr}>
          {isLoading ? (
            <CircularProgress className={classes.highlight} size={22} />
          ) : (
            <Box component='span' className={classes.highlight}>
              {CommonUtils.formatNumber(gotchiClaimed)}
            </Box>
          )}
          <Box component='span'> gotchis are summoned </Box>
          <Link className={classes.explorerLink} to='/explorer'>
            Aavegotchi Explorer
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}
