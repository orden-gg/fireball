import React from 'react';
import { Box, Alert, Link, ToggleButtonGroup, ToggleButton, Tooltip, Typography } from '@mui/material';
import { useStyles } from '../styles';

import commonUtils from '../../../utils/commonUtils';
import Gotchi from '../../../components/Gotchi/Gotchi';

export default function ClientGotchis({gotchis, gotchisFilter, setGotchisFilter, setGotchis, rewardCalculated}) {
    const classes = useStyles();

    const onSort = (event, newFilter) => {
        let dir = newFilter === 'createdAt' ? 'asc' : 'desc';

        setGotchis(commonUtils.basicSort(gotchis, newFilter, dir));
        setGotchisFilter(newFilter);
    };

    if(!gotchis.length) {
        return <Alert severity='info' sx={{ display: 'inline-flex' }}>
            No aavegotchis here... <Link
                href='https://www.aavegotchi.com/baazaar/aavegotchis?sort=latest'
                target='_blank'
                underline='hover'
                style={{ color: 'red' }}
            >
                [Baazaar listings]
            </Link>!
        </Alert>
    }

    return (
        <>
            <Box display='flex' alignItems='center' marginBottom='16px'>
                <Typography variant='subtitle1' sx={{ marginRight: '12px' }}>Sort: </Typography>

                <ToggleButtonGroup
                    value={gotchisFilter}
                    exclusive
                    onChange={onSort}
                    color='primary'
                    aria-label='gotchis sort'
                >
                    <ToggleButton className={classes.filtersButton} value='withSetsRarityScore' aria-label='modified rarity score'>
                        <Tooltip title='Rarity' placement='top' followCursor>
                            <Box className={classes.filtersInner} component='span'><span>🏆</span></Box>
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.filtersButton} value='baseRarityScore' aria-label='base rarity score'>
                        <Tooltip title='Base Rarity' placement='top' followCursor>
                            <Box className={classes.filtersInner} component='span'><span>🏅</span></Box>
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.filtersButton} value='kinship' aria-label='kinship'>
                        <Tooltip title='Kinship' placement='top' followCursor>
                            <Box className={classes.filtersInner} component='span'><span>🧡</span></Box>
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.filtersButton} value='experience' aria-label='experience'>
                        <Tooltip title='Experience' placement='top' followCursor>
                            <Box className={classes.filtersInner} component='span'><span>🗡</span></Box>
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.filtersButton} value='createdAt' aria-label='age'>
                        <Tooltip title='Age' placement='top' followCursor>
                            <Box className={classes.filtersInner} component='span'><span>📅</span></Box>
                        </Tooltip>
                    </ToggleButton>
                    {rewardCalculated ? (
                        <ToggleButton className={classes.filtersButton} value='reward' aria-label='reward'>
                            <Tooltip title='Reward' placement='top' followCursor>
                                <Box className={classes.filtersInner} component='span'><span>🎁</span></Box>
                            </Tooltip>
                        </ToggleButton>
                    ) : (
                        null
                    )}
                </ToggleButtonGroup>
            </Box>

            <Box className={classes.list}>
                {
                    gotchis.map((gotchi, i)=>{
                        return <div className={classes.listItem}  key={i}>
                            <Gotchi gotchi={gotchi} />
                        </div>
                    })
                }
            </Box>
        </>
    );
}