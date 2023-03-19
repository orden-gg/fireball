import { useEffect } from 'react';

import { Skeleton } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromTokensPricesStore from 'core/store/tokens-prices';

import { AlchemicaList, TokenPricesType } from 'shared/models';

import { GotchiHeartGif } from 'components/Icons/Icons';

import { CommonUtils, GotchiverseUtils, GraphUtils } from 'utils';

import { TokenTypes } from '../../../shared/constants/enums/enums';
import { styles } from './styles';

const altarsLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const tokens: string[] = [TokenTypes.Fud, TokenTypes.Fomo, TokenTypes.Alpha, TokenTypes.Kek];

export function GotchiKinshipTooltip({ kinship }: { kinship: string }) {
  const classes = styles();

  const isPricesLoaded: boolean = useAppSelector(fromTokensPricesStore.getIsPricesLoaded);
  const tokensPrices: TokenPricesType = useAppSelector(fromTokensPricesStore.getTokensPrices);

  const channelingBoots = GotchiverseUtils.countKinshipChannelingBoost(kinship);

  const dispatch = useAppDispatch();

  const renderTotalChannelingPrice = (alchemica: AlchemicaList): JSX.Element => {
    const total = alchemica.map((item, index) => item * tokensPrices[tokens[index]]);

    return (
      <span className={classes.totalPrice}>
        ≈{CommonUtils.convertFloatNumberToSuffixNumber(CommonUtils.summArray(total))}$
      </span>
    );
  };

  useEffect(() => {
    dispatch(fromTokensPricesStore.onLoadTokensPrices());
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.containerRow}>
        <GotchiHeartGif className={classes.gotchiKinshipIcon} width={12} height={12} />
        {kinship}
      </div>

      <div>
        {altarsLevels.map((level, altarIndex) => {
          const channelingRate = GotchiverseUtils.countGotchiChannelingRate(level, channelingBoots);

          return (
            <div className={classes.altar} key={altarIndex}>
              <div className={classes.row}>
                <span className={classes.rowTitle}>{level} lvl altar</span>
                <div>
                  {isPricesLoaded ? (
                    renderTotalChannelingPrice(channelingRate)
                  ) : (
                    <Skeleton className={classes.placeholder} variant='rectangular' width={50} height={16} />
                  )}
                </div>
              </div>

              <div className={classes.tokensList}>
                {tokens.map((token, tokenIndex) => (
                  <div className={classes.token} key={tokenIndex}>
                    <img className={classes.tokenIcon} src={GraphUtils.getTokenImg(token)} width={12} alt={token} />
                    {CommonUtils.convertFloatNumberToSuffixNumber(channelingRate[tokenIndex])}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
