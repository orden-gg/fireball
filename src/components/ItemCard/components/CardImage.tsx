import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { Erc1155Categories } from 'shared/constants';
import { InstallationsUtils, ItemUtils, TilesUtils } from 'utils';

import { imageStyles } from '../styles';

interface CardImageProps {
    id: number;
    category?: string;
    className?: string;
}

export function CardImage({ id, category, className }: CardImageProps) {
    const classes = imageStyles();
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
            case Erc1155Categories.Realm:
                name = InstallationsUtils.getNameById(id);
                url = InstallationsUtils.getImageById(id);
                break;
            default:
                name = ItemUtils.getItemNameById(id);
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
