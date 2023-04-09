import { CustomTooltip } from 'components/custom/CustomTooltip';

import { guildAssetStyles } from './styles';

interface GuildAssetProps {
  Icon: (className, width, height) => JSX.Element;
  title: string;
}

export function GuildAsset({ Icon, title }: GuildAssetProps) {
  const classes = guildAssetStyles();

  // TODO Use in the future or remove
  // const setNumber = amount => {
  //     if (amount !== undefined) {
  //         return amount
  //     } else {
  //         return <Skeleton  animation="wave" variant="text" className={classes.guildInfoAmountLoader} />;
  //     }
  // }

  return (
    <CustomTooltip title={title} followCursor placement='top'>
      <li className={classes.guildAssetItem}>
        <Icon className={classes.guildAssetItemIcon} />
        <span className={classes.guildAssetAmount}>999</span>
      </li>
    </CustomTooltip>
  );
}
