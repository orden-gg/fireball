import { CustomTooltip } from 'components/custom/CustomTooltip';

import { CommonUtils } from 'utils';

import { guildAssetStyles } from './styles';

interface GuildAssetProps {
  Icon: (className, width, height) => JSX.Element;
  title: string;
  value: number;
}

export function GuildAsset({ Icon, title, value }: GuildAssetProps) {
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
        <span className={classes.guildAssetAmount}>{CommonUtils.convertFloatNumberToSuffixNumber(value)}</span>
      </li>
    </CustomTooltip>
  );
}
