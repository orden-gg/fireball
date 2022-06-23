import { Typography } from '@mui/material';

import { ItemUtils } from 'utils';

export function ConsumableStats({ consumable }: { consumable: any }) {
    const stats = ItemUtils.getEmojiStatsById(consumable.id || consumable.erc1155TypeId);

    return (
        <Typography variant='subtitle1'>
            {stats}
        </Typography>
    );
}
