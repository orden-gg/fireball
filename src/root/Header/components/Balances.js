import React, { useContext } from 'react';

import classNames from 'classnames';

import CustomTooltip from 'components/custom/CustomTooltip';
import { BalancesContext } from 'contexts/BalancesContext';

import styles from './styles';

export default function Balances() {
    const classes = styles();

    const { tokens } = useContext(BalancesContext);

    if (!Boolean(tokens.length)) {
        return null;
    }

    return (
        <div className={classes.balancesWrapper}>
            {
                tokens.map((token, index) =>
                    <CustomTooltip
                        title={
                            <React.Fragment>
                                <span>{token.pricePerToken}$/{token.alt}</span>
                            </React.Fragment>
                        }
                        enterTouchDelay={0}
                        placement='top'
                        followCursor
                        key={index}
                    >
                        <div className={classes.balance}>
                            <div className={classNames(classes.balanceValue, token.alt)}>
                                <img
                                    src={token.imgSrc}
                                    className={classes.balanceIcon}
                                    width={14}
                                    height={14}
                                    alt={token.alt}
                                />
                                <p>{token.amount}</p>
                            </div>
                            <p className={classes.balancePrice}>
                                {token.balance !== 0 ? `${token.balance}$` : ''}
                            </p>
                        </div>
                    </CustomTooltip>
                )
            }
        </div>
    );
}
