import { guildCardImageStyles } from './styles';

export function GuildCardImage({ children }: { children: React.ReactNode }) {
  const classes = guildCardImageStyles();

  return <div className={classes.guildCardImageWrap}>{children}</div>;
}
