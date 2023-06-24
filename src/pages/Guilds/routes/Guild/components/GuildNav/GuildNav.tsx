import GridViewIcon from '@mui/icons-material/GridView';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import { useAppSelector } from 'core/store/hooks';
import * as fromGuildsStore from 'pages/Guilds/store';

import { PageNavLink } from 'shared/models';

import { GuildRouteNames } from 'pages/Guilds/constants';
import { GeneralGuildStats } from 'pages/Guilds/models';

import { GotchiIcon, GotchiverseIcon, H1SealedPortalIcon, WarehouseIcon } from 'components/Icons/Icons';
import { PageNav } from 'components/PageNav/PageNav';

import { guildNavStyles } from './styles';

export function GuildNav() {
  const classes = guildNavStyles();

  const guildStats: GeneralGuildStats = useAppSelector(fromGuildsStore.getGuildStats);
  const isGuildStatsLoading: boolean = useAppSelector(fromGuildsStore.getIsGuildStatsLoading);

  const navData: PageNavLink[] = [
    {
      path: GuildRouteNames.Dashboard,
      icon: <GridViewIcon width={24} height={24} />,
      isLoading: false
    },
    {
      path: GuildRouteNames.Members,
      icon: <PeopleAltIcon width={24} height={24} />,
      isLoading: false,
      count: guildStats.membersCount
    },
    {
      path: GuildRouteNames.Gotchis,
      icon: <GotchiIcon width={24} height={24} />,
      isLoading: isGuildStatsLoading,
      count: guildStats.gotchisCount
    },
    {
      path: GuildRouteNames.Wearables,
      icon: <WarehouseIcon width={24} height={24} />,
      isLoading: false,
      count: guildStats.itemsCount
    },
    {
      path: GuildRouteNames.Portals,
      icon: <H1SealedPortalIcon width={24} height={24} />,
      isLoading: isGuildStatsLoading,
      count: guildStats.portalsCount
    },
    {
      path: GuildRouteNames.Realm,
      icon: <GotchiverseIcon width={24} height={24} />,
      isLoading: isGuildStatsLoading,
      count: guildStats.realmCount
    }
  ];

  return (
    <div className={classes.guildNav}>
      <PageNav links={navData} />
    </div>
  );
}
