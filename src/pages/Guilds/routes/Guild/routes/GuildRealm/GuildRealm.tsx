import { useEffect, useMemo } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromGuildsStore from 'pages/Guilds/store';

import { RealmGroup } from 'shared/models';

import { GeneralGuildStats, GuildRealm as GuildRealmModel } from 'pages/Guilds/models';

import { Citadel } from 'components/Citadel/Citadel';

import { guildRealmStyles } from './styles';

export function GuildRealm(): JSX.Element {
  const classes = guildRealmStyles();

  const dispatch = useAppDispatch();

  const guildMembers: string[] = useAppSelector(fromGuildsStore.getCurrentGuildMembers);
  const guildStats: GeneralGuildStats = useAppSelector(fromGuildsStore.getGuildStats);
  const guildRealm: GuildRealmModel[] = useAppSelector(fromGuildsStore.getGuildRealm);
  const isGuildRealmLoaded: boolean = useAppSelector(fromGuildsStore.getIsGuildRealmLoaded);

  useEffect(() => {
    if (guildMembers.length > 0 && guildStats.realmCount !== 0) {
      dispatch(fromGuildsStore.onLoadGuildRealm(guildMembers, guildStats.realmCount));
    }
  }, [guildMembers, guildStats]);

  const realmGroups = useMemo(() => {
    const groups: RealmGroup<GuildRealmModel>[] = [];

    groups.push({
      parcels: guildRealm,
      icon: <VisibilityIcon />,
      tooltip: 'Owner realm',
      type: 'owner',
      active: true,
      animate: true
    });

    return groups;
  }, [guildRealm]);

  return <Citadel className={classes.guildCitadel} realmGroups={realmGroups} isLoaded={isGuildRealmLoaded} />;
}
