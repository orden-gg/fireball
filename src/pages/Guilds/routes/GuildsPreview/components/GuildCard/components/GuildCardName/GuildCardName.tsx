import { guildCardNameStyles } from './styles';

export function GuildCardName({ children }: { children: React.ReactNode }) {
  const classes = guildCardNameStyles();

  return <div className={classes.guildCardName}>{children}</div>;
}
