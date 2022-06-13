import { Typography } from '@mui/material';

import itemUtils from 'utils/itemUtils';

interface CardStatsProps {
    itemStats?: string;
    item?: any;
}

// TODO split into two components, one that relies on itemStats and other on item
export function CardStats({ itemStats, item }: CardStatsProps) {
    const stats: any = itemStats || itemUtils.getEmojiStatsById(item.id || item.erc1155TypeId);

    return (
        <Typography variant='subtitle1'>
            {stats}
        </Typography>
    );
}
