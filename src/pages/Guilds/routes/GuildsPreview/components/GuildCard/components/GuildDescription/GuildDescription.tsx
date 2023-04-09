import { guildDescriptionStyles } from './styles';

export function GuildDescription({ children, truncate }: { children: string; truncate: number }) {
  const classes = guildDescriptionStyles();

  return (
    <p className={classes.guildDescription}>
      {children.length > truncate ? `${children.slice(0, truncate)}...` : children}
    </p>
  );
}
