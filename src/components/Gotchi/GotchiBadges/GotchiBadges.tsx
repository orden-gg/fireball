import { Erc1155Categories } from 'shared/constants';

import { CardImage, CardName } from 'components/ItemCard/components';
import { CustomTooltip } from 'components/custom/CustomTooltip';

import { gotchiBadgesStyles } from './styles';

export function GotchiBadges({ badges }: { badges: number[] }) {
  const classes = gotchiBadgesStyles();

  return (
    <div className={classes.badges}>
      {badges?.map((badge: number, index: number) => (
        <CustomTooltip title={<CardName id={badge} className={classes.name} />} placement='top' key={index} arrow>
          <div className={classes.badge}>
            <CardImage id={badge} category={Erc1155Categories.Wearable} className={classes.badgeImage} />
          </div>
        </CustomTooltip>
      ))}
    </div>
  );
}
