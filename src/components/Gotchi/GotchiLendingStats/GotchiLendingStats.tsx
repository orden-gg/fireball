import TimerIcon from '@mui/icons-material/Timer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardControlKeyIcon from '@mui/icons-material/KeyboardControlKey';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

import classNames from 'classnames';
import { DateTime } from 'luxon';

import { CustomTooltip } from 'components/custom/CustomTooltip';
import { ShineLabel } from 'components/Labels/ShineLabel';
import { CommonUtils, GraphUtils } from 'utils';
import { DAY_MILLIS, HALF_DAY_MILLIS } from 'data/date';

import { styles } from './styles';

export function GotchiLendingStats({ gotchi }: { gotchi: any }) {
    const classes = styles();

    /**
        @const timeDiff - seconds
     */
    const timeDiff: number = DateTime.local().toSeconds() - gotchi.endTime;
    /**
        @const lastClaimed - milliseconds
     */
    const lastClaimed: number = parseInt(gotchi.lastClaimed) > 0 ? parseInt(gotchi.lastClaimed) : 0;

    /**
     * @param lastActivity - milliseconds
    */
    const renderActivity = (lastActivity: number) => {
        return (
            DateTime.local().toMillis() - lastActivity > DAY_MILLIS ? (
                <KeyboardDoubleArrowDownIcon
                    className={classes.activityBad}
                    fontSize='small'
                />
            ) : DateTime.local().toMillis() - lastActivity > HALF_DAY_MILLIS ? (
                <KeyboardControlKeyIcon
                    className={classes.activityModerate}
                    fontSize='small'
                />
            ) : (
                <KeyboardDoubleArrowUpIcon
                    className={classes.activityTop}
                    fontSize='small'
                />
            )
        );
    };

    return (
        <div>
            <div className={classNames(classes.section, classes.head)}>
                <div className={classNames(classes.inner, timeDiff > 0 && 'over')}>
                    {timeDiff > 0 ? (
                        <TimerIcon className={classes.innerIcon} fontSize='small' />
                    ) : (
                        <AccessTimeIcon className={classes.innerIcon} fontSize='small' />
                    )}

                    {DateTime.fromSeconds(gotchi.endTime).toRelative()}
                </div>
            </div>

            <div className={classes.section}>
                <div className={classes.splits}>
                    <div>owner</div>
                    <div>
                        <span className={gotchi.splitOwner > 0 ? 'highlight' : ''}>
                            {gotchi.splitOwner}
                        </span>%
                    </div>
                </div>
                <div className={classes.splits}>
                    <div>borrower</div>
                    <div>
                        <span className={gotchi.splitBorrower > 0 ? 'highlight' : ''}>
                            {gotchi.splitBorrower}
                        </span>%
                    </div>
                </div>
                <div className={classes.splits}>
                    <div>other</div>
                    <div>
                        <span className={gotchi.splitOther > 0 ? 'highlight' : ''}>
                            {gotchi.splitOther}
                        </span>%
                    </div>
                </div>
            </div>

            <div className={classNames(classes.section, classes.tokensStats)}>
                <div className={classNames(classes.inner, classes.income)}>
                    <CustomTooltip
                        title={
                            <span>
                                total <span className='highlight'>alchemica</span> (power in <span className='highlight'>fud</span> equivalent)
                            </span>
                        }
                        placement='top'
                        followCursor
                    >
                        <div className={classes.inner}>
                            <GroupWorkIcon className={classes.innerIcon} fontSize='small' />
                            {CommonUtils.convertFloatNumberToSuffixNumber(gotchi.totalTokens)}
                            <span className={classes.alchemicaPower}>
                                ({CommonUtils.convertFloatNumberToSuffixNumber(gotchi.income)})
                            </span>
                        </div>
                    </CustomTooltip>
                </div>
            </div>

            {gotchi.tokensToShare.length > 0 && (
                <div className={classNames(classes.section, classes.tokens)}>
                    {gotchi.tokensToShare.map((token: any, index: number) => {
                        const tokenName = GraphUtils.getTokenName(token);

                        return (
                            <div className={classNames(classes.token, tokenName)} key={index}>
                                <img
                                    src={GraphUtils.getTokenImg(tokenName)}
                                    width={14}
                                    alt={tokenName}
                                />
                                <span>{CommonUtils.convertFloatNumberToSuffixNumber(gotchi[tokenName])}</span>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className={classNames(classes.section, classes.bottom)}>
                <div className={classes.inner}>
                    <ShineLabel text={CommonUtils.cutAddress(gotchi.borrower, '..')} />
                </div>

                <div className={classes.inner}>
                    <CustomTooltip
                        title={
                            <span>
                                last claimed: <span className='highlight'>{lastClaimed > 0 ? DateTime.fromSeconds(lastClaimed).toRelative() : 'never'}</span>
                            </span>
                        }
                        placement='top'
                        followCursor
                    >
                        <div className={classNames(classes.inner, classes.activity)}>
                            {renderActivity(lastClaimed)}
                        </div>
                    </CustomTooltip>
                </div>
            </div>
        </div>
    );
}
