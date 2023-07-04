import { guildCardFooterStyles } from './styles';

export function GuildCardFooter({ children }: { children: React.ReactNode }) {
  const classes = guildCardFooterStyles();

  return <div className={classes.guildCardFooter}>{children}</div>;
}
