import React from 'react';
import TimerIcon from '@mui/icons-material/Timer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardControlKeyIcon from '@mui/icons-material/KeyboardControlKey';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import TimelineIcon from '@mui/icons-material/Timeline';

import classNames from 'classnames';
import { DateTime } from 'luxon';

import CustomTooltip from 'components/custom/CustomTooltip';
import ShineLabel from 'components/Labels/ShineLabel';
import commonUtils from 'utils/commonUtils';
import graphUtils from 'utils/graphUtils';

import styles from './styles';

export default function GotchiLendingStats({ gotchi }) {
    const classes = styles();

    const dayMillis = 86400 * 1000;
    const halfDayMillis = 43200 * 1000;
    const timeDiff = DateTime.local() - DateTime.fromSeconds(gotchi.endTime);
    const lastClaimed = parseInt(gotchi.lastClaimed) > 0 ? DateTime.fromSeconds(parseInt(gotchi.lastClaimed)) : 0;

    const renderActivity = (lastActivity) => {
        return (
            DateTime.local() - lastActivity > dayMillis ? (
                <KeyboardDoubleArrowDownIcon
                    className={classNames(classes.activityIcon, classes.activityBad)}
                    fontSize='small'
                />
            ) : DateTime.local() - lastActivity > halfDayMillis ? (
                <KeyboardControlKeyIcon
                    className={classNames(classes.activityIcon, classes.activityModerate)}
                    fontSize='small'
                />
            ) : (
                <KeyboardDoubleArrowUpIcon
                    className={classNames(classes.activityIcon, classes.activityTop)}
                    fontSize='small'
                />
            )
        )
    };

    return (
        <div className={classes.container}>
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
                        <span className={gotchi.splitOwner > 0 ? 'highlight' : undefined}>
                            {gotchi.splitOwner}
                        </span>%
                    </div>
                </div>
                <div className={classes.splits}>
                    <div>borrower</div>
                    <div>
                        <span className={gotchi.splitBorrower > 0 ? 'highlight' : undefined}>
                            {gotchi.splitBorrower}
                        </span>%
                    </div>
                </div>
                <div className={classes.splits}>
                    <div>other</div>
                    <div>
                        <span className={gotchi.splitOther > 0 ? 'highlight' : undefined}>
                            {gotchi.splitOther}
                        </span>%
                    </div>
                </div>
            </div>

            <div className={classNames(classes.section, classes.tokensStats)}>
                <div className={classNames(classes.inner, classes.income)}>
                    <CustomTooltip
                        title={<span>total <span className='highlight'>tokens</span> / balanced <span className='highlight'>income</span></span>}
                        placement='top'
                        followCursor
                    >
                        <div className={classes.inner}>
                            <EmojiEventsOutlinedIcon className={classes.innerIcon} fontSize='small' />
                            {gotchi.totalTokens} / {gotchi.income}
                        </div>
                    </CustomTooltip>
                </div>
            </div>

            <div className={classNames(classes.section, classes.tokens)}>
                {gotchi.tokensToShare.map((token, index) => {
                    const tokenName = graphUtils.getTokenName(token);

                    return (
                        <div className={classNames(classes.token, tokenName)} key={index}>
                            <img
                                src={graphUtils.getTokenImg(tokenName)}
                                width={14}
                                alt={tokenName}
                            />
                            <span>{commonUtils.convertFloatNumberToSuffixNumber(gotchi[tokenName])}</span>
                        </div>
                    )
                })}
            </div>

            <div className={classNames(classes.section, classes.bottom)}>
                <div className={classes.inner}>
                    <ShineLabel text={commonUtils.cutAddress(gotchi.borrower, '..')} />
                </div>

                <div className={classes.inner}>
                    <CustomTooltip
                        title={<span>last claimed: <span className='highlight'>{lastClaimed > 0 ? lastClaimed.toRelative() : 'never'}</span></span>}
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
