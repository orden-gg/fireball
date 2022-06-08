import { Typography } from '@mui/material';

import itemUtils from 'utils/itemUtils';

import styles from '../../styles';

export default function CardStats({ itemStats, item }) {
    const classes = styles();
    const stats = itemStats || itemUtils.getEmojiStatsById(item.id || item.erc1155TypeId);

    return (
        <Typography variant='subtitle1' className={classes.stats}>
            {stats}
        </Typography>
    );
}
