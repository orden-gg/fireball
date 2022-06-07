import AccessTimeIcon from '@mui/icons-material/AccessTime';

import classNames from 'classnames';
import { Duration } from 'luxon';

import { GhstTokenIcon } from 'components/Icons/Icons';
import ViewInAppButton from 'components/ViewInAppButton/ViewInAppButton';
import ethersApi from 'api/ethers.api';
import commonUtils from 'utils/commonUtils';
import graphUtils from 'utils/graphUtils';

import styles from './styles';

export default function GotchiLending({ gotchi }) {
    const classes = styles();

    const periodToMillis = gotchi.period * 1000;
    const periodObject = Duration.fromMillis(periodToMillis).shiftTo('years', 'months', 'days', 'hours').normalize().toObject();

    const renderPeriod = () => {
        return (
            <>
                {Object.entries(periodObject).map((period, index) => {
                    const value = period[1];
                    const key = value > 1 ? period[0] : period[0].slice(0, -1);

                    if (value === 0) {
                        return null;
                    }

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
                    <GhstTokenIcon className={classes.innerIcon} width={18} height={18} />
                    {commonUtils.formatPrice(ethersApi.fromWei(gotchi.upfrontCost))}
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

            <div className={classNames(classes.section, classes.tokens)}>
                {gotchi.tokensToShare.map((token, index) => {
                    const tokenName = graphUtils.getTokenName(token);

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
