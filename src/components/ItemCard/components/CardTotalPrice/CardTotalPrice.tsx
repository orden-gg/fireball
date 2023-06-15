import { useContext } from 'react';
import ContentLoader from 'react-content-loader';

import { alpha } from '@mui/material';
import { useTheme } from '@mui/material';

import classNames from 'classnames';

import { EthersApi } from 'api';

import { GhstTokenGif } from 'components/Icons/Icons';
import { CustomTooltip } from 'components/custom/CustomTooltip';

import { CommonUtils } from 'utils';

import { CardContext } from '../../context/CardContext';
import { styles } from './styles';

interface CardTotalPriceProps {
  balance: number;
  priceInWei?: string;
  className?: string;
}

export function CardTotalPrice({ balance, priceInWei, className }: CardTotalPriceProps) {
  const classes = styles();
  const theme = useTheme();

  const { lastSold } = useContext<CustomAny>(CardContext);

  const renderNode = (): string => {
    if (lastSold.price !== 0 || priceInWei) {
      return CommonUtils.formatPrice(
        lastSold.price && balance ? lastSold.price * balance : EthersApi.fromWei(priceInWei)
      );
    } else {
      return '???';
    }
  };

  return (
    <>
      {!CommonUtils.isEmptyObject(lastSold) ? (
        <CustomTooltip title='Total value' placement='top' followCursor>
          <div className={classNames(classes.total, className)}>
            <span>{renderNode()}</span>
            <GhstTokenGif width={18} height={18} />
          </div>
        </CustomTooltip>
      ) : (
        <ContentLoader
          speed={2}
          viewBox='0 0 60 26'
          backgroundColor={alpha(theme.palette.common.black, 0.1)}
          foregroundColor={alpha(theme.palette.common.black, 0.4)}
          className={classes.totalValueLoader}
        >
          <rect x='0' y='0' width='60' height='26' />
        </ContentLoader>
      )}
    </>
  );
}
