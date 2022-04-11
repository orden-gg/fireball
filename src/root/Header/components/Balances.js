import React, { useContext } from 'react';
import { useTheme } from '@emotion/react';

import classNames from 'classnames';

import CustomTooltip from 'components/custom/CustomTooltip';
import { BalancesContext } from 'contexts/BalancesContext';

import styles from './styles';
import ContentLoader from 'react-content-loader';

export default function Balances() {
    const classes = styles();
    const theme = useTheme();

    const { tokens, isBalancesLoading } = useContext(BalancesContext);

    if (!Boolean(tokens.length)) {
        return null;
    }

    return (
        <div className={classes.balancesWrapper}>
            {
                tokens.map((token, index) =>
                    ( isBalancesLoading ?
                        <ContentLoader
                            speed={2}
                            viewBox='0 0 55 20'
                            backgroundColor={theme.palette.secondary.dark}
                            foregroundColor={'#16181a'}
                            className={classes.balanceLoader}
                            key={index}
                        >
                            <rect x='0' y='0' width='55' height='20' />
                        </ContentLoader> :
                        <CustomTooltip
                            title={
                                <React.Fragment>
                                    <span>{token.pricePerToken}$/<span className='highlight'>{token.alt}</span></span>
                                </React.Fragment>
                            }
                            enterTouchDelay={0}
                            placement='bottom'
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
                )
            }
        </div>
    );
}
