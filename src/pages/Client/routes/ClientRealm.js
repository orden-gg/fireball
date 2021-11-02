import React, { useState } from 'react';
import { Box, Alert, Typography, ToggleButtonGroup, ToggleButton, Tooltip  } from '@mui/material';
import { useStyles } from '../styles';
import commonUtils from '../../../utils/commonUtils';

import Parcel from '../../../components/Items/Parcel/Parcel';

import fud from '../../../assets/images/icons/fud.png';
import fomo from '../../../assets/images/icons/fomo.png';
import alpha from '../../../assets/images/icons/alpha.png';
import kek from '../../../assets/images/icons/kek.png';

export default function ClientRealm({realm, setRealm}) {
    const classes = useStyles();
    const [realmFilter, setRealmFilter] = useState('sizeDesc');

    const onSort = (event, newFilter) => {
        let asc = newFilter?.includes('Asce');
        let desc = newFilter?.includes('Desc');
        let filter = newFilter;
        let dir = 'desc';

        if(asc || desc) {
            filter = newFilter.slice(0, -4);
            asc ? dir = 'asc' : dir = 'desc';
        }
        
        setRealm(commonUtils.basicSort(realm, filter, dir));
        setRealmFilter(newFilter);
    };

    if(!realm.length) {
        return <Alert severity='info' sx={{ display: 'inline-flex' }}>
            No realm here...
        </Alert>
    }

    return (
        <>
            <Box display='flex' alignItems='center' marginBottom='16px'>
                <Box display='flex' alignItems='center' marginRight='24px'>
                    <Typography variant='subtitle1' sx={{ marginRight: '12px' }}>Sort: </Typography>

                    <ToggleButtonGroup
                        value={realmFilter}
                        exclusive
                        onChange={onSort}
                        color='primary'
                        aria-label='realm sort'
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

                <Box display='flex' alignItems='center'>
                    <Typography variant='subtitle1' sx={{ marginRight: '12px' }}>Boosts: </Typography>

                    <ToggleButtonGroup
                        value={realmFilter}
                        exclusive
                        onChange={onSort}
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