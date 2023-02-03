import { Typography } from '@mui/material';

import classNames from 'classnames';

import { ItemUtils } from 'utils';

import { styles } from './styles';

interface CardNameProps {
  item: any;
  itemName?: string;
  itemRarity?: any;
}

export function CardName({ itemName, itemRarity, item }: CardNameProps) {
  const classes = styles();

  const name: string = itemName || ItemUtils.getNameById(item.id || item.erc1155TypeId);
  const rarity: string = itemRarity || ItemUtils.getRarityNameById(item.id || item.erc1155TypeId);

  return (
    <div className={classes.nameWrapper}>
      <Typography className={classNames(classes.name, classes.textHighlight, rarity)}>{name}</Typography>
    </div>
  );
}
