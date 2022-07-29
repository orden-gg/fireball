import { Link } from '@mui/material';

import classNames from 'classnames';

import { CustomTooltip } from 'components/custom/CustomTooltip';

import { styles } from './styles';

interface CardBalanceProps {
    balance: number;
    holders?: string[];
    className?: string;
}

export function CardBalance({ balance, holders, className }: CardBalanceProps) {
    const classes = styles();

    return (
        <div className={classNames(className, classes.balance)}>
            {holders?.length ? (
                <CustomTooltip
                    title={
                        <div className={classes.equippedTitle}>
                            <p className={classes.equippedTitleText}>Equipped at:</p>
                            {
                                holders.map((holder, index) => {
                                    return <span key={index}>
                                    <Link
                                        href={`https://app.aavegotchi.com/gotchi/${holder}`}
                                        target='_blank'
                                        underline='none'
                                        className={classes.equippedTitleLink}
                                    >
                                        {holder}
                                    </Link>
                                        {index === holders.length - 1 ? '' : ', '}
                                </span>;
                                })
                            }
                        </div>
                    }
                    placement='top'
                >
                    <span>{holders.length}<span className={classes.itemBalanceDivider}>/</span>{balance}</span>
                </CustomTooltip>
            ) : (
                balance
            )}
        </div>
    );
}
