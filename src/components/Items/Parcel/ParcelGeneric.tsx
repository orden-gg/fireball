import { Tooltip, Typography } from '@mui/material';

import classNames from 'classnames';

import { RaffleItemChance } from 'pages/Raffle/components/RaffleItemChance';

import { CitadelUtils } from 'utils';

import { ERC1155InnerStyles, itemStyles, parselStyles, tooltipStyles } from '../styles';

interface ParcelGenericProps {
  parcel: any;
  raffleChances: any;
}

export function ParcelGeneric({ parcel, raffleChances }: ParcelGenericProps) {
  const classes = {
    ...itemStyles(),
    ...ERC1155InnerStyles(),
    ...tooltipStyles(),
    ...parselStyles()
  };

  const size: any = CitadelUtils.getParcelSizeName(parcel.size);

  return (
    <div className={classNames(classes.item, size, classes.parcelCard)}>
      <div className={classes.labels}>
        <Tooltip title='Quantity' classes={{ tooltip: classes.customTooltip }} placement='top' followCursor>
          <div className={classNames(classes.label, classes.labelBalance)}>
            <Typography variant='subtitle2'>{parcel.balance}</Typography>
          </div>
        </Tooltip>
      </div>

      <div className={'two-lined'}>
        <Typography className={size}>{size}</Typography>
      </div>

      <div className={classes.size}>{CitadelUtils.getParcelDimmentions(parcel.size)}</div>

      {raffleChances && <RaffleItemChance stats={raffleChances} />}
    </div>
  );
}
