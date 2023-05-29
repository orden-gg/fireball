import HomeIcon from '@mui/icons-material/Home';

import { useAppSelector } from 'core/store/hooks';
import * as fromGuildsStore from 'pages/Guilds/store';

import { PageNavLink } from 'shared/models';

import { GuildRouteNames } from 'pages/Guilds/constants';
import { GeneralGuildStats } from 'pages/Guilds/models';

import { GotchiIcon, H1SealedPortalIcon } from 'components/Icons/Icons';
import { PageNav } from 'components/PageNav/PageNav';

import { guildNavStyles } from './styles';

export function GuildNav() {
  const classes = guildNavStyles();

  const guildStats: GeneralGuildStats = useAppSelector(fromGuildsStore.getGuildStats);
  const isGuildStatsLoading: boolean = useAppSelector(fromGuildsStore.getIsGuildStatsLoading);

  const navData: PageNavLink[] = [
    {
      path: GuildRouteNames.Home,
      icon: <HomeIcon width={24} height={24} />,
      isLoading: false
    },
    {
      path: GuildRouteNames.Gotchis,
      icon: <GotchiIcon width={24} height={24} />,
      isLoading: isGuildStatsLoading,
      count: guildStats.gotchisCount
    },
    {
      path: GuildRouteNames.Portals,
      icon: <H1SealedPortalIcon width={24} height={24} />,
      isLoading: isGuildStatsLoading,
      count: guildStats.portalsCount
    }
  ];

  return (
    <div className={classes.guildNav}>
      <PageNav links={navData} />
    </div>
  );
}
