import ContentLoader from 'react-content-loader';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link, Typography, alpha } from '@mui/material';
import { useTheme } from '@mui/material';

import classNames from 'classnames';
import { DateTime } from 'luxon';

import { Erc1155Listing, Erc1155SoldListing } from 'shared/models';

import { GhstTokenGif } from 'components/Icons/Icons';
import { CustomTooltip } from 'components/custom/CustomTooltip';

import { CommonUtils } from 'utils';

import { styles } from './styles';

interface CardListingProps {
  lastSoldListing: Undefinable<Erc1155SoldListing>;
  currentListing: Undefinable<Erc1155Listing>;
}

// TODO this component is currently used for Glossary Card components and should be replacement
// TODO for CardListing component in ItemCard submodule. Possibly should be moved to
// TODO ItemCard directory
export function CardListing({ lastSoldListing, currentListing }: CardListingProps) {
  const classes = styles();
  const theme = useTheme();

  return (
    <>
      {currentListing && lastSoldListing ? (
        <CustomTooltip
          title={
            <>
              {lastSoldListing.price > 0 ? (
                <Typography variant='caption'>
                  Sold for{' '}
                  <Link
                    href={`https://app.aavegotchi.com/baazaar/erc1155/${lastSoldListing.id}`}
                    target='_blank'
                    className={classes.soldOutLink}
                  >
                    {CommonUtils.formatPrice(lastSoldListing.price)}
                  </Link>{' '}
                  [{lastSoldListing.soldDate && DateTime.fromISO(lastSoldListing.soldDate).toRelative()}]
                </Typography>
              ) : (
                <p className={classes.noSales}>No sales</p>
              )}
            </>
          }
          placement='top'
        >
          {currentListing.price === 0 ? (
            <div className={classNames(classes.listings)}>
              <Typography variant='subtitle2' className={classes.error}>
                No listings
              </Typography>
            </div>
          ) : (
            <Link
              href={`https://app.aavegotchi.com/baazaar/erc1155/${currentListing.id}`}
              target='_blank'
              className={classNames(classes.listings)}
            >
              {currentListing.price === lastSoldListing.price ? (
                <Typography className={classes.lastPrice} variant='subtitle2'>
                  {CommonUtils.formatPrice(currentListing.price)}
                </Typography>
              ) : currentListing.price > lastSoldListing.price ? (
                <>
                  <KeyboardArrowUpIcon color='success' fontSize='inherit' />
                  <Typography className={classes.lastPriceUp} variant='subtitle2'>
                    {CommonUtils.formatPrice(currentListing.price)}
                  </Typography>
                </>
              ) : (
                <>
                  <KeyboardArrowDownIcon color='warning' fontSize='inherit' />
                  <Typography className={classes.lastPriceDown} variant='subtitle2'>
                    {CommonUtils.formatPrice(currentListing.price)}
                  </Typography>
                </>
              )}
              <GhstTokenGif width={18} height={18} className={classes.coin} />
            </Link>
          )}
        </CustomTooltip>
      ) : (
        <ContentLoader
          speed={2}
          viewBox='0 0 60 25'
          backgroundColor={alpha(theme.palette.secondary.dark, 0.5)}
          foregroundColor={alpha(theme.palette.secondary.main, 0.5)}
          className={classes.listingsLoader}
        >
          <rect x='0' y='0' width='60' height='25' />
        </ContentLoader>
      )}
    </>
  );
}
