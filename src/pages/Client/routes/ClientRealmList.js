import React, { useContext, useEffect } from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton, Tooltip  } from '@mui/material';

import GhostLoader from 'components/GhostLoader/GhostLoader';
import Parcel from 'components/Items/Parcel/Parcel';
import { ClientContext } from 'contexts/ClientContext';
import fud from 'assets/images/icons/fud.png';
import fomo from 'assets/images/icons/fomo.png';
import alpha from 'assets/images/icons/alpha.png';
import kek from 'assets/images/icons/kek.png';

import { routersStyles } from '../styles';

export default function ClientRealmList() {
    const classes = routersStyles();
    const { realm, realmFilter, loadingRealm, sortData, setRealmView } = useContext(ClientContext);

    useEffect(() => {
        setRealmView('list');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loadingRealm || !realm.length) {
        return <Box  className={classes.loaderBox}>
            <GhostLoader
                animate={loadingRealm || !realm.length}
                text={!loadingRealm && !realm.length ? 'No realm here :(' : null}
            />
        </Box>
    }

    return (
        <>
            <Box className={classes.sortWrapper}>
                <Box className={classes.sortInner}>
                    <Typography variant='subtitle1' sx={{ marginRight: '12px' }}>Views: </Typography>

                    <ToggleButtonGroup
                        value={realmFilter}
                        exclusive
                        onChange={(event, value) => sortData(event, value, 'realm')}
                        color='primary'
                        aria-label='realm views'
                    >
                        <ToggleButton className={classes.filtersButton} value='sizeDesc' aria-label='size ↓'>
                            <Tooltip title='Size ↓' placement='top' followCursor>
                                <Box className={classes.filtersInner} component='span'><span>🔽</span></Box>
                            </Tooltip>
                        </ToggleButton>
                        <ToggleButton className={classes.filtersButton} value='sizeAsce' aria-label='size ↑'>
                            <Tooltip title='Size ↑' placement='top' followCursor>
                                <Box className={classes.filtersInner} component='span'><span>🔼</span></Box>
                            </Tooltip>
                        </ToggleButton>
                        <ToggleButton className={classes.filtersButton} value='districtAsce' aria-label='disctrict ↓'>
                            <Tooltip title='Disctrict ↓' placement='top' followCursor>
                                <Box className={classes.filtersInner} component='span'><span>🏢</span></Box>
                            </Tooltip>
                        </ToggleButton>
                        <ToggleButton className={classes.filtersButton} value='districtDesc' aria-label='disctrict ↑'>
                            <Tooltip title='Disctrict ↑' placement='top' followCursor>
                                <Box className={classes.filtersInner} component='span'><span>🏠</span></Box>
                            </Tooltip>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Box className={classes.sortInner}>
                    <Typography variant='subtitle1' className={classes.sortText}>Boosts: </Typography>

                    <ToggleButtonGroup
                        value={realmFilter}
                        exclusive
                        onChange={(event, value) => sortData(event, value, 'realm')}
                        color='primary'
                        aria-label='realm sort'
                    >
                        <ToggleButton className={classes.filtersButton} value='fudBoost' aria-label='Fud'>
                            <Tooltip title='Fud' placement='top' followCursor>
                                <Box className={classes.filtersInner} component='span'><img src={fud} alt='Fud' width={18} /></Box>
                            </Tooltip>
                        </ToggleButton>
                        <ToggleButton className={classes.filtersButton} value='fomoBoost' aria-label='Fomo'>
                            <Tooltip title='Fomo' placement='top' followCursor>
                                <Box className={classes.filtersInner} component='span'><img src={fomo} alt='Fomo' width={18} /></Box>
                            </Tooltip>
                        </ToggleButton>
                        <ToggleButton className={classes.filtersButton} value='alphaBoost' aria-label='Alpha'>
                            <Tooltip title='Alpha' placement='top' followCursor>
                                <Box className={classes.filtersInner} component='span'><img src={alpha} alt='Alpha' width={18} /></Box>
                            </Tooltip>
                        </ToggleButton>
                        <ToggleButton className={classes.filtersButton} value='kekBoost' aria-label='Kek'>
                            <Tooltip title='Kek' placement='top' followCursor>
                                <Box className={classes.filtersInner} component='span'><img src={kek} alt='Kek' width={18} /></Box>
                            </Tooltip>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Box>

            <Box className={classes.list}>
                {
                    realm.map((parcel, i)=>{
                        return <div className={classes.listItem}  key={i}>
                            <Parcel parcel={parcel} />
                        </div>
                    })
                }
            </Box>
        </>
    );
}
