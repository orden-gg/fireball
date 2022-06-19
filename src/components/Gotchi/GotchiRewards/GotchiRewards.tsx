import { Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { GhstTokenGif } from 'components/Icons/Icons';
import { CommonUtils } from 'utils';

import { styles } from './styles';

export function GotchiRewards({ gotchi }: { gotchi }) {
    const classes = styles();

    return (
        gotchi.reward || gotchi.reward === 0 ? (
            <div className={classes.rankBox}>
                {gotchi.reward > 0 ? (
                    <Tooltip
                        title={
                            <>
                                {gotchi.rewardStats.map((item: any, index: number) => {
                                    return item.reward !== 0 ? (
                                        <p key={index}>
                                            {item.name}[<span>{item.position}</span>] -
                                            <span className={classes.rankReward}>
                                                {CommonUtils.formatPrice(item.reward)}
                                                <GhstTokenGif width={14} height={14} />
                                            </span>
                                        </p>
                                    ) : (
                                        null
                                    );
                                })}
                            </>
                        }
                        enterTouchDelay={0}
                        placement='top'
                        followCursor
                    >
                        <Box className={classes.rankRewardAmount}>
                            🏆<Typography>{CommonUtils.formatPrice(gotchi.reward)}</Typography>🏆
                        </Box>
                    </Tooltip>

                ) : (
                    <div className={classes.rankStatus} key={`${gotchi.id}-rewards`}>
                        <Typography className={classes.rankStatusText}>Unkranked</Typography>
                    </div>
                )}
            </div>
        ) : (
            null
        )
    );
}
