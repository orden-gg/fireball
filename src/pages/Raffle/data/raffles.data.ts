import { DateTime } from 'luxon';

import { RafflesData } from '../models/raffles-data.model';

export const raffles: RafflesData[] = [
  {
    id: 3,
    name: 'wearables-4',
    type: 'wearables',
    startDate: DateTime.local(2021, 3, 29, 14, { zone: 'utc' }),
    endDate: DateTime.local(2021, 4, 1, 14, { zone: 'utc' }),
    tickets: [0, 1, 2, 3, 4, 5],
    icon: require('../../../assets/images/wearables/156.svg').default
  },
  {
    id: 4,
    name: 'haunt-2',
    type: 'portals',
    startDate: DateTime.local(2021, 9, 5, 14, { zone: 'utc' }),
    endDate: DateTime.local(2021, 9, 8, 14, { zone: 'utc' }),
    tickets: [6],
    icon: require('../../../assets/images/portals/h2-sealed.svg').default
  },
  {
    id: 5,
    name: 'wearables-5',
    type: 'wearables',
    startDate: DateTime.local(2021, 9, 24, 14, { zone: 'utc' }),
    endDate: DateTime.local(2021, 9, 27, 14, { zone: 'utc' }),
    tickets: [0, 1, 2, 3, 4, 5],
    icon: require('../../../assets/images/wearables/261.svg').default
  },
  {
    id: 6,
    name: 'realm',
    type: 'realm-generic', // realm type without spicifications (hamble, spacious, reasonable)
    tickets: [6],
    startDate: DateTime.local(2021, 11, 5, 14, { zone: 'utc' }),
    endDate: DateTime.local(2021, 11, 8, 14, { zone: 'utc' }),
    icon: require('../../../assets/images/icons/kek.svg').default
  },
  {
    id: 7,
    name: 'realm-2',
    type: 'realm',
    tickets: [6],
    startDate: DateTime.local(2021, 12, 15, 14, { zone: 'utc' }),
    endDate: DateTime.local(2021, 12, 18, 14, { zone: 'utc' }),
    icon: require('../../../assets/images/icons/fud.svg').default
  },
  {
    id: 8,
    name: 'defi-rpg-wearables',
    type: 'wearables',
    tickets: [0, 1, 2, 3, 4, 5],
    startDate: DateTime.local(2022, 1, 26, 14, { zone: 'utc' }),
    endDate: DateTime.local(2022, 1, 29, 14, { zone: 'utc' }),
    icon: require('../../../assets/images/wearables/313.svg').default
  },
  {
    id: 9,
    name: 'decorations',
    type: 'installations',
    tickets: [0, 1, 2, 3, 4, 5],
    startDate: DateTime.local(2022, 6, 9, 14, { zone: 'utc' }),
    endDate: DateTime.local(2022, 6, 12, 14, { zone: 'utc' }),
    icon: require('../../../assets/images/installations/21.png').default
  },
  {
    id: 11,
    name: 'schematics',
    type: 'wearables',
    tickets: [0, 1, 2, 4, 5],
    startDate: DateTime.local(2023, 3, 10, 14, { zone: 'utc' }),
    endDate: DateTime.local(2023, 3, 13, 14, { zone: 'utc' }),
    icon: require('../../../assets/images/wearables/352.svg').default
  }
];
