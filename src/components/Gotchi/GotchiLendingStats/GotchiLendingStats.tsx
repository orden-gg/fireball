import TimerIcon from '@mui/icons-material/Timer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import classNames from 'classnames';
import { DateTime } from 'luxon';

import { EthAddress } from 'components/EthAddress/EthAddress';

import { styles } from './styles';

export function GotchiLendingStats({ gotchi }: { gotchi: any }) {
    const classes = styles();

    /**
        @const timeDiff - seconds
     */
    const timeDiff: number = DateTime.local().toSeconds() - gotchi.endTime;

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

            {/* // TODO that code will be reused in the future, but if you see this please check with @dudendy if it's still needed :)
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
            )} */}

            <div className={classNames(classes.section, classes.bottom)}>
                <div className={classes.inner}>
                    <EthAddress
                        address={gotchi.borrower}
                        isShowIcon={true}
                        isClientLink={true}
                        isCopyButton={true}
                        isPolygonButton={true}
                    />
                </div>
            </div>
        </div>
    );
}
