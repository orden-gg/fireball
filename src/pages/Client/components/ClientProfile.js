import React, { useContext } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';
import web3 from '../../../api/web3';

import { ClientContext } from '../../../contexts/ClientContext';
import commonUtils from '../../../utils/commonUtils';

import ghstIcon from '../../../assets/images/ghst-doubleside.gif';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: '0 4px !important',
        paddingRight: '12px !important',
        paddingLeft: '12px !important',
        backgroundColor: `${alpha(theme.palette.primary.main, .1)} !important`,
        '&:hover': {
            backgroundColor: `${alpha(theme.palette.primary.main, .2)} !important`,
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

export default function ClientProfile() {
    const classes = useStyles();

    const { clientActive, reward, calculateReward, rewardCalculated } = useContext(ClientContext);

    return (
        <Box display='flex' flexWrap='wrap' justifyContent='space-between' bgcolor='secondary.dark' padding='20px'borderRadius='4px'>
            <Box display='flex' flexDirection='column' justifyContent='space-between'>
                <Typography variant='h6' paragraph>
                    Logged as <Box
                        component='span'
                        position='relative'
                        color={web3.isAddressValid(clientActive) ? 'success.main' : 'warning.main'}
                    >
                        {clientActive}
                        {!web3.isAddressValid(clientActive) ? (
                            <Box component='span' position='absolute' right={0} bottom='-20px' whiteSpace='nowrap' fontSize='12px' color='error.main'>Not a valid address!</Box>
                        ) : (
                            null
                        )}
                    </Box>
                </Typography>
            </Box>

            <Box textAlign='right'>
                <Typography variant='h6' color='info.main' paragraph>
                    SZN 2 Rarity farming is LIVE!
                </Typography>

                <Box display='flex' alignItems='center' justifyContent='flex-end'>
                    {reward ? (
                        <Typography className={classes.rewardText} variant='h6'>
                            <span className='lighter'>{commonUtils.formatPrice(reward)}</span><img src={ghstIcon} width='24' alt='GHST Token Icon' />
                            <Box component='span' display='inline-flex' alignItems='center' fontSize='16px' marginLeft='4px'>
                                (<span className='lighter'>{commonUtils.formatPrice(reward / 4)}</span><img src={ghstIcon} width='18' alt='GHST Token Icon' />/round)
                            </Box>
                        </Typography>
                        
                    ) : (
                        null
                    )}

                    <Button
                        disabled={rewardCalculated}
                        // disabled={isDataLoading() || !gotchis.length ||rewardCalculated}
                        variant={'contained'}
                        size='large'
                        className={classes.calculateButton}
                        onClick={calculateReward}
                    >
                        Calculate Reward
                    </Button>

                </Box>
            </Box>
        </Box>
    );
}