import classNames from 'classnames';

import { DEFAULT_WEAREBLE_IDS, Erc1155Categories, WEARABLE_SLOTS } from 'shared/constants';
import { CardImage, CardName, CardStats } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { ItemUtils } from 'utils';

import { wearableSlotStyles } from './styles';

interface WearableSlotProps {
  id: number;
  slotId: number;
  className?: string;
}

export function WearableSlot({ id, slotId, className }: WearableSlotProps) {
  const classes = wearableSlotStyles();

  const name: string = WEARABLE_SLOTS[slotId];
  const rarity: string = ItemUtils.getRarityNameById(id);

  return (
    <div className={classNames(classes.wearableCell, className, name.toLowerCase().replace(' ', '-'))}>
      {id !== 0 ? (
        <CustomTooltip
          title={
            <>
              <CardName id={id} />
              <CardStats stats={ItemUtils.getTraitModifiersById(id)} />
            </>
          }
          followCursor
          placement='top'
        >
          <div className={classes.wearableBox}>
            <ItemCard type={rarity} className={classes.wearable}>
              <CardImage id={id} category={Erc1155Categories.Wearable} className={classes.image} />
            </ItemCard>
          </div>
        </CustomTooltip>
      ) : (
        <div className={classes.wearableBox}>
          <ItemCard type='default' className={classNames(classes.wearable, classes.placeholder)}>
            <CardImage
              id={DEFAULT_WEAREBLE_IDS[slotId]}
              category={Erc1155Categories.Wearable}
              className={classes.image}
            />
          </ItemCard>
        </div>
      )}
    </div>
  );
}
