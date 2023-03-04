import { useContext, useEffect, useMemo, useState } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';

import { TheGraphApi } from 'api';

import { GuildsContext } from 'pages/Guilds/GuildsContext';

import { Citadel } from 'components/Citadel/Citadel';

import { guildContentStyles } from '../styles';

export function GuildsRealm() {
  const classes = guildContentStyles();

  const { guilds, guildId, guildRealm, setGuildRealm } = useContext<any>(GuildsContext);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const realmGroups = useMemo(() => {
    const groups: any[] = [];

    groups.push({
      parcels: guildRealm,
      /* eslint-disable-next-line react/jsx-key */
      icon: <VisibilityIcon />,
      tooltip: 'Owner realm',
      type: 'owner',
      active: true,
      animate: true
    });

    return groups;
  }, [guildRealm]);

  useEffect(() => {
    let mounted = true;

    if (guildId === null) {
      return;
    }

    TheGraphApi.getRealmByAddresses(guilds[guildId].members).then((realm) => {
      if (mounted) {
        setGuildRealm(realm);
        setIsLoaded(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, [guilds, guildId, setGuildRealm]);

  return <Citadel className={classes.guildCitadel} realmGroups={realmGroups} isLoaded={isLoaded} />;
}
