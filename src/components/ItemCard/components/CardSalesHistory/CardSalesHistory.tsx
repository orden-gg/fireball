import classNames from 'classnames';
import { DateTime } from 'luxon';

import { EthAddress } from 'components/EthAddress/EthAddress';

import { styles } from './styles';

interface CardSalesHistoryProps {
    listing: {
        seller: string;
        buyer: string;
        timePurchased: number;
    },
    className?: string
}

export function CardSalesHistory({ listing, className }: CardSalesHistoryProps) {
    const classes = styles();

    return (
        <div className={classNames(classes.historyWrapper, className)}>
            <div className={classes.historyRow}>
                <div className={classes.historyTitle}>
                    time:
                </div>
                <div className={classes.historyInner}>
                    {DateTime.fromSeconds(listing.timePurchased).toRelative()}
                </div>
            </div>
            <div className={classes.historyRow}>
                <div className={classes.historyTitle}>
                    seller:
                </div>
                <div className={classes.historyInner}>
                    <EthAddress
                        address={listing.seller}
                        isShowIcon
                        isClientLink
                    />
                </div>
            </div>
            <div className={classes.historyRow}>
                <div className={classes.historyTitle}>
                    buyer:
                </div>
                <div className={classes.historyInner}>
                    <EthAddress
                        address={listing.buyer}
                        isShowIcon
                        isClientLink
                    />
                </div>
            </div>
        </div>
    );
}
