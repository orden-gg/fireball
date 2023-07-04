import { guildAssetsStyles } from './styles';

export function GuildCardAssets({ children }: { children: React.ReactNode }) {
  const classes = guildAssetsStyles();

  return <div className={classes.guildCardAssetsList}>{children}</div>;
}
