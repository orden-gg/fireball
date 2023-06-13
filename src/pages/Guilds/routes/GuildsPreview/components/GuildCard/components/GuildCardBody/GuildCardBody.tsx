import { guildCardBodyStyles } from './styles';

export function GuildCardBody({ children }: { children: React.ReactNode }) {
  const classes = guildCardBodyStyles();

  return <div className={classes.guildCardBody}>{children}</div>;
}
