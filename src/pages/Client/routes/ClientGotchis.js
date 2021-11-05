import React, { useContext } from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Tooltip, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useStyles } from '../styles';
import { ClientContext } from '../../../contexts/ClientContext';
import commonUtils from '../../../utils/commonUtils';

import Gotchi from '../../../components/Gotchi/Gotchi';
import GhostLoader from '../../../components/GhostLoader/GhostLoader';
import ghstIcon from '../../../assets/images/ghst-doubleside.gif';

export default function ClientGotchis() {
    const classes = useStyles();
    const { gotchis, gotchisFilter, loadingGotchis, sortData, reward, calculateReward, rewardCalculating, rewardCalculated } = useContext(ClientContext);


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


                <Box display='flex' alignItems='center' marginLeft='16px'>

                    <LoadingButton
                        disabled={rewardCalculated}
                        onClick={calculateReward}
                        loading={rewardCalculating}
                        variant='contained'
                        sx={{ marginRight: '16px' }}
                    >
                        {reward ? 'Reward:' : 'Calculate Reward'}
                    </LoadingButton>

                    {reward ? (
                        <Typography variant='h6' style={{ display: 'inline-flex', alignItems: 'center' }}>
                            <span className={classes.lightText}>{commonUtils.formatPrice(reward)}</span>
                            <img src={ghstIcon} width='24' alt='GHST Token Icon' />

                            <Box component='span' display='inline-flex' alignItems='center' fontSize='16px' marginLeft='4px'>
                                (<span className={classes.lightText}>{commonUtils.formatPrice(reward / 4)}</span>
                                <img src={ghstIcon} width='18' alt='GHST Token Icon' />/round)
                            </Box>
                        </Typography>
                        
                    ) : (
                        null
                    )}

                </Box>
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