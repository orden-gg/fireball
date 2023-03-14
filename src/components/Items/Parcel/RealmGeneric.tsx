import { Tooltip, Typography } from '@mui/material';

import classNames from 'classnames';

import { RaffleItemChance } from 'pages/Raffle/components/RaffleItemChance';

import { ERC1155InnerStyles, itemStyles, parselStyles, tooltipStyles } from '../styles';

interface RealmGenericProps {
  realm: CustomAny;
  raffleChances: CustomAny;
}

export function RealmGeneric({ realm, raffleChances }: RealmGenericProps) {
  const classes = {
    ...itemStyles(),
    ...ERC1155InnerStyles(),
    ...tooltipStyles(),
    ...parselStyles()
  };

  return (
    <div className={classNames(classes.item, 'realm-generic', classes.parcelCard)}>
      <div className={classes.labels}>
        <Tooltip title='Quantity' classes={{ tooltip: classes.customTooltip }} placement='top' followCursor>
          <div className={classNames(classes.label, classes.labelBalance)}>
            <Typography variant='subtitle2'>{realm.balance}</Typography>
          </div>
        </Tooltip>
      </div>

      <div className={'two-lined'}>
        <Typography className={'realm-generic'}>Realm</Typography>
      </div>

      {raffleChances && <RaffleItemChance stats={raffleChances} />}
    </div>
  );
}
