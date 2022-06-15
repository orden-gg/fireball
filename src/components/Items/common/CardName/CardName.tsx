import { Typography } from '@mui/material';

import classNames from 'classnames';

import itemUtils from 'utils/itemUtils';

import { styles } from './styles';

interface CardNameProps {
    item: any;
    itemName?: string;
    itemRarity?: any;
}

export function CardName({ itemName, itemRarity, item }: CardNameProps) {
    const classes = styles();

    const name: string = itemName || itemUtils.getItemNameById(item.id || item.erc1155TypeId);
    const rarity: string = itemRarity || itemUtils.getItemRarityById(item.id || item.erc1155TypeId);

    return (
        <div className={classes.nameWrapper}>
            <Typography className={classNames(classes.name, classes.textHighlight, rarity)}>
                {name}
            </Typography>
        </div>
    );
}
