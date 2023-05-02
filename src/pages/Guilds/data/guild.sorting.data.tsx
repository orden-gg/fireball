import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import GrainIcon from '@mui/icons-material/Grain';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';

import { SortingListItem } from 'shared/models';

import { filtersData } from 'data/filters.data';

export const gotchiSorting: SortingListItem[] = [
  {
    name: 'id',
    key: 'id',
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
  }
];

export const initialFilters: CustomAny = {
  hauntId: { ...filtersData.hauntId, divider: true },
  collateral: { ...filtersData.collateral, divider: true },
  search: { ...filtersData.search }
};

export const warehouseSorting: SortingListItem[] = [
  {
    name: 'rarity',
    key: 'rarityId',
    paramKey: 'rarity',
    tooltip: 'rarity',
    icon: <GrainIcon fontSize='small' />
  },
  {
    name: 'quantity',
    key: 'balance',
    paramKey: 'quantity',
    tooltip: 'quantity',
    icon: <FormatListNumberedIcon fontSize='small' />
  }
];
