import { useContext } from 'react';

import { PageNavLink } from 'shared/models';

import { GuildsContext } from 'pages/Guilds/GuildsContext';

import { GotchiIcon, KekIcon, LendingIcon } from 'components/Icons/Icons';
import { PageNav } from 'components/PageNav/PageNav';

import { guildNavStyles } from '../styles';

export function GuildNav() {
  const classes = guildNavStyles();

  const { guildGotchis, guildLendings, guildRealm } = useContext<CustomAny>(GuildsContext);

  const navData: PageNavLink[] = [
    {
      name: 'gotchis',
      path: 'gotchis',
      icon: <GotchiIcon width={24} height={24} />,
      isLoading: false,
      count: guildGotchis.length || '...'
    },
    {
      name: 'lendings',
      path: 'lendings',
      icon: <LendingIcon width={24} height={24} />,
      isLoading: false,
      count: guildLendings.length || '...'
    },
    {
      name: 'realm',
      path: 'realm',
      icon: <KekIcon width={24} height={24} />,
      isLoading: false,
      count: guildRealm.length || '...'
    }
  ];

  return (
    <div className={classes.guildNav}>
      <PageNav links={navData} />
    </div>
  );
}
