import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import ScienceIcon from '@mui/icons-material/Science';

import { SortingListItem } from 'shared/models';

export const gotchisListingsSortings: SortingListItem[] = [
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
        name: 'id',
        key: 'tokenId',
        paramKey: 'id',
        tooltip: 'gotchi id',
        icon: <Grid3x3Icon fontSize='small' />
    },
    {
        name: 'mrs',
        key: 'modifiedRarityScore',
        paramKey: 'mrs',
        tooltip: 'rarity score',
        icon: <EmojiEventsOutlinedIcon fontSize='small' />
    },
    {
        name: 'brs',
        key: 'baseRarityScore',
        paramKey: 'brs',
        tooltip: 'base rarity score',
        icon: <FormatListNumberedIcon fontSize='small' />
    },
    {
        name: 'kin',
        key: 'kinship',
        paramKey: 'kin',
        tooltip: 'kinship',
        icon: <FavoriteBorderIcon fontSize='small' />
    },
    {
        name: 'experience',
        key: 'experience',
        paramKey: 'exp',
        tooltip: 'experience',
        icon: <ScienceIcon fontSize='small' />
    }
];
