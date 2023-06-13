import { CustomTooltip } from 'components/custom/CustomTooltip';

import { CommonUtils } from 'utils';

import { guildAssetsStyles } from './styles';

interface GuildAssetProps {
  Icon: (className, width, height) => JSX.Element;
  title: string;
  value: number;
}

export function GuildCardAsset({ Icon, title, value }: GuildAssetProps) {
  const classes = guildAssetsStyles();

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
      <li className={classes.guildCardAssetItem}>
        <div className={classes.guildCardAssetIconWrap}>
          <Icon className={classes.guildCardAssetIcon} />
        </div>
        <span className={classes.guildCardAssetAmount}>{CommonUtils.convertFloatNumberToSuffixNumber(value)}</span>
      </li>
    </CustomTooltip>
  );
}
