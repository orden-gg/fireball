import { Typography } from '@mui/material';

import itemUtils from 'utils/itemUtils';

export function ConsumableStats({ consumable }: { consumable: any }) {
    const stats = itemUtils.getEmojiStatsById(consumable.id || consumable.erc1155TypeId);

    return (
        <Typography variant='subtitle1'>
            {stats}
        </Typography>
    );
}
