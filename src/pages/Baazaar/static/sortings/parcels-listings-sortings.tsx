import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import HeightIcon from '@mui/icons-material/Height';
import HouseIcon from '@mui/icons-material/House';

import { SortingListItem } from 'shared/models';

import { AlphaIcon, FomoIcon, FudIcon, KekIcon } from 'components/Icons/Icons';

export const parcelsListingsSortings: SortingListItem[] = [
  {
    name: 'size',
    key: 'size',
    paramKey: 'size',
    tooltip: 'size',
    icon: <HeightIcon fontSize='small' />
  },
  {
    name: 'district',
    key: 'district',
    paramKey: 'district',
    tooltip: 'district',
    icon: <HouseIcon fontSize='small' />
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
  },
  {
    name: 'id',
    key: 'tokenId',
    paramKey: 'id',
    tooltip: 'parcel id',
    icon: <Grid3x3Icon fontSize='small' />
  },
  {
    name: 'fudBoost',
    key: 'fudBoost',
    paramKey: 'fud',
    tooltip: 'fud boost',
    icon: <FudIcon height={18} width={18} />
  },
  {
    name: 'fomoBoost',
    key: 'fomoBoost',
    paramKey: 'fomo',
    tooltip: 'fomo boost',
    icon: <FomoIcon height={18} width={18} />
  },
  {
    name: 'alphaBoost',
    key: 'alphaBoost',
    paramKey: 'alpha',
    tooltip: 'alpha boost',
    icon: <AlphaIcon height={18} width={18} />
  },
  {
    name: 'kekBoost',
    key: 'kekBoost',
    paramKey: 'kek',
    tooltip: 'kek boost',
    icon: <KekIcon height={18} width={18} />
  }
];
