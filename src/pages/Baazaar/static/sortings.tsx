import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ScienceIcon from '@mui/icons-material/Science';

import { SortingListItem } from 'shared/models';

export const gotchiListingsSortings: SortingListItem[] = [
    {
        name: 'price',
        key: 'priceInWei',
        tooltip: 'price',
        icon: <AttachMoneyIcon fontSize='small' />
    },
    {
        name: 'time created',
        key: 'timeCreated',
        tooltip: 'time created',
        icon: <AccessTimeIcon fontSize='small' />
    },
    {
        name: 'id',
        key: 'tokenId',
        tooltip: 'gotchi id',
        icon: <Grid3x3Icon fontSize='small' />
    },
    {
        name: 'mrs',
        key: 'modifiedRarityScore',
        tooltip: 'rarity score',
        icon: <EmojiEventsOutlinedIcon fontSize='small' />
    },
    {
        name: 'brs',
        key: 'baseRarityScore',
        tooltip: 'base rarity score',
        icon: <FormatListNumberedIcon fontSize='small' />
    },
    {
        name: 'kin',
        key: 'kinship',
        tooltip: 'kinship',
        icon: <FavoriteBorderIcon fontSize='small' />
    },
    {
        name: 'experience',
        key: 'experience',
        tooltip: 'experience',
        icon: <ScienceIcon fontSize='small' />
    }
];

export const closedPortalsListingsSortings: SortingListItem[] = [
    {
        name: 'price',
        key: 'priceInWei',
        tooltip: 'price',
        icon: <AttachMoneyIcon fontSize='small' />
    },
    {
        name: 'time created',
        key: 'timeCreated',
        tooltip: 'time created',
        icon: <AccessTimeIcon fontSize='small' />
    },
    {
        name: 'id',
        key: 'tokenId',
        tooltip: 'portal id',
        icon: <Grid3x3Icon fontSize='small' />
    }
];
