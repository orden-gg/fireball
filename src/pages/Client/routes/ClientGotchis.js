import React, { useContext } from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Tooltip, Typography } from '@mui/material';
import { useStyles } from '../styles';
import { ClientContext } from '../../../contexts/ClientContext';

import Gotchi from '../../../components/Gotchi/Gotchi';
import GhostLoader from '../../../components/GhostLoader/GhostLoader';

export default function ClientGotchis() {
    const classes = useStyles();
    const { gotchis, gotchisFilter, loadingGotchis, sortData, rewardCalculated } = useContext(ClientContext);


    if(loadingGotchis || !gotchis.length) {
        return <Box textAlign='center' paddingTop={'32px'}>
            <GhostLoader
                animate={loadingGotchis || !gotchis.length}
                text={!loadingGotchis && !gotchis.length ? 'No gotchis here :(' : null}
            />
        </Box>
    }

    return (
        <>
            <Box display='flex' alignItems='center' justifyContent='center' marginBottom='16px'>
                <Typography variant='subtitle1' sx={{ marginRight: '12px' }}>Sort: </Typography>

                <ToggleButtonGroup
                    value={gotchisFilter}
                    exclusive
                    onChange={(event, value) => sortData(event, value, 'gotchis')}
                    color='primary'
                    aria-label='gotchis sort'
                >
                    <ToggleButton className={classes.filtersButton} value='modifiedRarityScore' aria-label='modified rarity score'>
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
                    <ToggleButton className={classes.filtersButton} value='createdAtAsce' aria-label='age'>
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