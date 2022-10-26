import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';

import { SortingListItem } from 'shared/models';

export const openedPortalsListingsSortings: SortingListItem[] = [
    {
        name: 'price',
        key: 'priceInWei',
        paramKey: 'price',
        tooltip: 'price',
        icon: <AttachMoneyIcon fontSize='small' />
    },
    {
        name: 'time created',
        key: 'timeCreated',
        paramKey: 'timeCreated',
        tooltip: 'time created',
        icon: <AccessTimeIcon fontSize='small' />
    },
    {
        name: 'brs',
        key: 'baseRarityScore',
        paramKey: 'brs',
        tooltip: 'base rarity score',
        icon: <FormatListNumberedIcon fontSize='small' />
    },
    {
        name: 'id',
        key: 'tokenId',
        paramKey: 'id',
        tooltip: 'portal id',
        icon: <Grid3x3Icon fontSize='small' />
    }
];
