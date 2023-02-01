import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GrainIcon from '@mui/icons-material/Grain';

import { SortingListItem } from 'shared/models';

export const installationsListingsSortings: SortingListItem[] = [
  {
    name: 'rarity',
    key: 'rarityLevel',
    paramKey: 'rarity',
    tooltip: 'rarity',
    icon: <GrainIcon fontSize='small' />
  },
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
  }
];
