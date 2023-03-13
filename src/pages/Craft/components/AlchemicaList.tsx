import { useContext } from 'react';

import classNames from 'classnames';

import { CraftContext } from '../CraftContext';
import { sidebarStyles } from '../styles';

interface AlchemicaCostProps {
  cost: CustomAny[];
  amount: CustomAny;
}

export function AlchemicaList({ cost = [], amount }: AlchemicaCostProps) {
  const classes = sidebarStyles();

  const { tokens, isWalletConnected } = useContext<CustomAny>(CraftContext);

  return (
    <ul className={classes.alchemicaList}>
      {[...tokens].splice(0, 4).map((token: CustomAny, index) => {
        const tokenSum = cost[index] * amount || 0;

        return (
          <li
            className={classNames(
              classes.alchemicaToken,
              tokenSum > token.amount && isWalletConnected && classes.disabled
            )}
            key={index}
          >
            <span className={classes.tokenIcon}>{token.icon}</span>
            <p className={classes.tokenSum}>{tokenSum}</p>
          </li>
        );
      })}
    </ul>
  );
}
