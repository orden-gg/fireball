import guilds from 'data/guilds.json';

import { GuildCard } from './components/GuildCard/GuildCard';
import { guildsPreviewStyles } from './styles';

export function GuildsPreview() {
  const classes = guildsPreviewStyles();

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
