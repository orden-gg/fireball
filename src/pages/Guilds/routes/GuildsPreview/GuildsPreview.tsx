import { useEffect } from 'react';

// store
import * as fromGuildsStore from '../../store';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';

import { Guild } from '../../models';
import { GuildCard } from './components/GuildCard/GuildCard';
import { guildsPreviewStyles } from './styles';

export function GuildsPreview() {
  const classes = guildsPreviewStyles();

  const dispatch = useAppDispatch();

  const guilds: Guild[] = useAppSelector(fromGuildsStore.getGuilds);
  const getIsGuildsLoading: boolean = useAppSelector(fromGuildsStore.getIsGuildsLoading);

  useEffect(() => {
    dispatch(fromGuildsStore.onLoadGuilds());
  }, []);

  if (getIsGuildsLoading) {
    return <div>Loading...</div>;
  }

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
