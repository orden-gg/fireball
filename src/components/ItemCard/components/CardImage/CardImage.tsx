import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { InstallationsUtils, ItemUtils, TilesUtils } from 'utils';

import { Erc1155Categories } from 'shared/constants';

import { styles } from './styles';

interface CardImageProps {
  id: number;
  category?: string;
  className?: string;
}

export function CardImage({ id, category, className }: CardImageProps) {
  const classes = styles();

  const [src, setSrc] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    let url: string;
    let name: string;

    switch (category) {
      case Erc1155Categories.Ticket:
        name = ItemUtils.getItemRarityName(id.toString());
        url = ItemUtils.getTicketImg(name);
        break;
      case Erc1155Categories.Tile:
        name = TilesUtils.getNameById(id);
        url = TilesUtils.getImageById(id);
        break;
      case Erc1155Categories.Installation:
        name = InstallationsUtils.getNameById(id);
        url = InstallationsUtils.getImageById(id);
        break;
      default:
        name = ItemUtils.getNameById(id);
        url = ItemUtils.getWearableImg(id);
        break;
    }

    setSrc(url);
    setName(name);
  }, [id, category]);

  return (
    <div className={classNames(classes.imageWrapper, className)}>
      <img src={src} alt={name} className={classes.image} />
    </div>
  );
}
