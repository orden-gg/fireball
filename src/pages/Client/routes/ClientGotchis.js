import React, { useContext } from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Tooltip, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { loadRewardsStyles, routersStyles } from '../styles';

import { ClientContext } from '../../../contexts/ClientContext';
import commonUtils from '../../../utils/commonUtils';

import Gotchi from '../../../components/Gotchi/Gotchi';
import GhostLoader from '../../../components/GhostLoader/GhostLoader';
import ghstIcon from '../../../assets/images/ghst-doubleside.gif';

export default function ClientGotchis() {
    const classes = {
        ...loadRewardsStyles(),
        ...routersStyles()
    };
    const { gotchis, gotchisFilter, loadingGotchis, sortData, reward, calculateReward, rewardCalculating, rewardCalculated } = useContext(ClientContext);


    if(loadingGotchis || !gotchis.length) {
        return <Box className={classes.loaderBox}>
            <GhostLoader
                animate={loadingGotchis || !gotchis.length}
                text={!loadingGotchis && !gotchis.length ? 'No gotchis here :(' : null}
            />
        </Box>
    }

    return (
        <>
            <Box className={classes.sortWrapper}>
                <Typography className={classes.sortText} variant='subtitle1'>Sort: </Typography>

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


                <Box className={classes.loadWrapper}>

                    <LoadingButton
                        disabled={rewardCalculated}
                        onClick={calculateReward}
                        loading={rewardCalculating}
                        variant='contained'
                        className={classes.loadButton}
                    >
                        {reward ? 'Reward:' : 'Calculate Reward'}
                    </LoadingButton>

                    {reward ? (
                        <Typography variant='h6' className={classes.loadReward}>
                            <span className={classes.lightText}>{commonUtils.formatPrice(reward)}</span>
                            <img src={ghstIcon} width='24' alt='GHST Token Icon' />

                            <Box component='span' className={classes.loadRoundReward}>
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