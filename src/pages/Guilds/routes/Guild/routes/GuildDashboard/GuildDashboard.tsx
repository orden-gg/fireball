import { useEffect, useMemo } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromGuildsStore from 'pages/Guilds/store';

import { RealmGroup } from 'shared/models';

import { GeneralGuildStats, GuildRealm as GuildRealmModel } from 'pages/Guilds/models';

import { Citadel } from 'components/Citadel/Citadel';
import { ContentInner } from 'components/Content/ContentInner';

import { guildDashboardStyles } from './styles';

export function GuildDashboard(): JSX.Element {
  const classes = guildDashboardStyles();

  const dispatch = useAppDispatch();

  // const guildMembers: string[] = useAppSelector(fromGuildsStore.getCurrentGuildMembers);
  // const guildStats: GeneralGuildStats = useAppSelector(fromGuildsStore.getGuildStats);
  // const guildRealm: GuildRealmModel[] = useAppSelector(fromGuildsStore.getGuildRealm);
  // const isGuildRealmLoaded: boolean = useAppSelector(fromGuildsStore.getIsGuildRealmLoaded);

  // useEffect(() => {
  //   // TODO: brainstorm this condition
  //   if (guildStats.realmCount !== 0) {
  //     dispatch(fromGuildsStore.onLoadGuildRealm(guildMembers, guildStats.realmCount));
  //   }
  // }, [guildMembers, guildStats]);

  // const realmGroups = useMemo(() => {
  //   const groups: RealmGroup<GuildRealmModel>[] = [];

  //   groups.push({
  //     parcels: guildRealm,
  //     icon: <VisibilityIcon />,
  //     tooltip: 'Owner realm',
  //     type: 'owner',
  //     active: true,
  //     animate: true
  //   });

  //   return groups;
  // }, [guildRealm]);

  return (
    <ContentInner dataLoading={false}>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia quos est veniam inventore harum deserunt
        ullam eveniet labore iure, iusto blanditiis itaque. Quasi explicabo ipsam dicta, illum velit non at?
      </div>
    </ContentInner>
  );
}
