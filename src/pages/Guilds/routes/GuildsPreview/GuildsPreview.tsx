import { useEffect } from 'react';

import { useAppDispatch } from 'core/store/hooks';
import * as fromGuildsStore from 'pages/Guilds/store';

import guilds from 'data/guilds.json';

import { GuildCard } from './components/GuildCard/GuildCard';
import { guildsPreviewStyles } from './styles';

export function GuildsPreview() {
  const classes = guildsPreviewStyles();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fromGuildsStore.onLoadGuilds());
  }, []);

  return (
    <div className={classes.guildsWrapper}>
      <ul className={classes.guildsList}>
        {guilds.map((guild: CustomAny, index: number) => (
          <GuildCard guild={guild} key={index} />
        ))}
      </ul>
    </div>
  );
}
