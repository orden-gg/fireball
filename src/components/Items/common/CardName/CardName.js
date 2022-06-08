import { Typography } from '@mui/material';

import classNames from 'classnames';

import itemUtils from 'utils/itemUtils';

import styles from './styles';

export default function CardName({ itemName, itemRarity, item }) {
    const classes = styles();
    const name = itemName || itemUtils.getItemNameById(item.id || item.erc1155TypeId);
    const rarity = itemRarity || itemUtils.getItemRarityById(item.id || item.erc1155TypeId);

    return (
        <div className={classes.nameWrapper}>
            <Typography className={classNames(classes.name, classes.textHighlight, rarity)}>
                {name}
            </Typography>
        </div>
    );
}
