import React, { useContext } from 'react';
import { Link } from '@mui/material';
import { useTheme } from '@mui/material';

import classNames from 'classnames';
import ContentLoader from 'react-content-loader';

import CustomTooltip from 'components/custom/CustomTooltip';
import { BalancesContext } from 'contexts/BalancesContext';

import styles from './styles';

export default function Balances() {
    const classes = styles();
    const theme = useTheme();

    const { tokens, isBalancesLoading } = useContext(BalancesContext);

    if (!tokens.length) {
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
                                    <span>{token.pricePerToken}$/<span className='highlight'>{token.key}</span></span>
                                </React.Fragment>
                            }
                            enterTouchDelay={0}
                            placement='bottom'
                            followCursor
                            key={index}
                        >
                            <Link className={classes.balance} href={token.swapUrl} target='_blank'>
                                <div className={classNames(classes.balanceValue, token.key)}>
                                    { token.icon }
                                    <p>{token.amount}</p>
                                </div>
                                <p className={classes.balancePrice}>
                                    {token.balance !== 0 ? `${token.balance}$` : ''}
                                </p>
                            </Link>
                        </CustomTooltip>
                    )
                )
            }
        </div>
    );
}
