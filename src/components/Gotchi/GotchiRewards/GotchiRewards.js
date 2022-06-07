import { Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { GhstTokenGif } from 'components/Icons/Icons';
import commonUtils from 'utils/commonUtils';

import styles from './styles';

export default function GotchiRewards({ gotchi }) {
    const classes = styles();

    return (
        gotchi.reward || gotchi.reward === 0 ? (
            <div className={classes.rankBox}>
                {gotchi.reward > 0 ? (
                    <Tooltip
                        title={
                            <>
                                {gotchi.rewardStats.map((item, index) => {
                                    return item.reward !== 0 ? (
                                        <p key={index}>
                                            {item.name}[<span>{item.position}</span>] -
                                            <span className={classes.rankReward}>
                                                {commonUtils.formatPrice(item.reward)}
                                                <GhstTokenGif width={14} height={14} />
                                            </span>
                                        </p>
                                    ) : (
                                        null
                                    );
                                })}
                            </>
                        }
                        classes={{ tooltip: classes.customTooltip }}
                        enterTouchDelay={0}
                        placement='top'
                        followCursor
                    >
                        <Box className={classes.rankRewardAmount}>
                            🏆<Typography className={classes.rankRewardAmountNumber}>{commonUtils.formatPrice(gotchi.reward)}</Typography>🏆
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
