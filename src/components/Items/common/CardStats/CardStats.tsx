import { Typography } from '@mui/material';

import { ItemUtils } from 'utils';

interface CardStatsProps {
    itemStats?: string;
    item?: any;
}

// TODO split into two components, one that relies on itemStats and other on item
export function CardStats({ itemStats, item }: CardStatsProps) {
    const stats: any = itemStats || ItemUtils.getEmojiStatsById(item.id || item.erc1155TypeId);

    return (
        <Typography variant='subtitle1'>
            {stats}
        </Typography>
    );
}
