import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import classNames from 'classnames';
import { Duration } from 'luxon';

import ViewInAppButton from 'components/ViewInAppButton/ViewInAppButton';
import ethersApi from 'api/ethers.api';
import commonUtils from 'utils/commonUtils';
import graphUtils from 'utils/graphUtils';
import ghstIcon from 'assets/images/tokens/ghst.svg';

import styles from './styles';

export default function GotchiLending({ gotchi }) {
    const classes = styles();

    const periodToMillis = gotchi.period * 1000;
    const periodObject = Duration.fromMillis(periodToMillis).shiftTo('years', 'months', 'days', 'hours').normalize().toObject();

    const renderPeriod = () => {
        return (
            <>
                {Object.entries(periodObject).map((period, index) => {
                    let value = period[1];
                    let key = value > 1 ? period[0] : period[0].slice(0, -1);

                    if(value === 0) return null;

                    return <span style={{ margin: '2px 2px 0' }} key={index}>
                        {value} {key}
                    </span>
                })}
            </>
        )
    };

    return (
        <div className={classes.container}>
            <div className={classNames(classes.section, classes.head)}>
                <div className={classes.inner}>
                    <AccessTimeIcon className={classes.innerIcon} fontSize='small' />
                    {renderPeriod()}
                </div>
                <div className={classes.inner}>
                    <img src={ghstIcon} className={classes.innerIcon} width='18' alt='GHST token' />
                    {commonUtils.formatPrice(ethersApi.fromWei(gotchi.upfrontCost))}
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

            <div className={classNames(classes.section, classes.tokens)}>
                {gotchi.tokensToShare.map((token, index) => {
                    let tokenName = graphUtils.getTokenName(token);

                    return (
                        <img
                            className={classes.token}
                            src={graphUtils.getTokenImg(tokenName)}
                            width={32}
                            alt={tokenName}
                            key={index}
                        />
                    )
                })}
            </div>

            <ViewInAppButton link={`https://app.aavegotchi.com/lending/${gotchi.lendingId}`} />
        </div>
    );
}
