import { useContext, useMemo } from 'react';

import classNames from 'classnames';

import { CraftContext } from '../CraftContext';

import { sidebarStyles } from '../styles';

export default function AlchemicaCost({ cost = [], amount }) {
    const { tokens, isWalletConnected } = useContext(CraftContext);
    const classes = sidebarStyles();

    const alchemicaTokens = useMemo(() => [...tokens].splice(0, 4), [tokens]);

    return (
        <ul className={classes.alchemicaList}>
            {
                alchemicaTokens.map((token, index) => {
                    const tokenSum = cost[index] * amount || 0;

                    return (
                        <li className={classNames(
                                classes.alchemicaToken,
                                tokenSum > token.amount && isWalletConnected && classes.disabled
                            )}
                            key={index}
                        >
                            <span className={classes.tokenIcon}>{token.icon}</span>
                            <p className={classes.tokenSum}>{tokenSum}</p>
                        </li>
                    );
                })
            }
        </ul>
    );
}
