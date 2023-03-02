import { useEffect, useState } from 'react';

import { Erc1155Categories, WearableTypes } from 'shared/constants';

import { GotchiCollateral } from 'components/Gotchi/GotchiCollateral/GotchiCollateral';
import { WearableSlot } from 'components/Items/WearableSlot/WearableSlot';

import { ItemUtils } from 'utils';

import { TheGraphApi } from 'api';

import { GotchiEquipmentPrice } from '../GotchiEquipmentPrice/GotchiEquipmentPrice';
import { GotchiImage } from '../GotchiImage/GotchiImage';
import { GotchiInfoItem } from '../GotchiInfoList/components/GotchiInfoItem/GotchiInfoItem';
import { GotchiLevel } from '../GotchiLevel/GotchiLevel';
import { gotchiViewStyles } from './styles';

interface GotchiViewProps {
  gotchi: any;
}

export function GotchiView({ gotchi }: GotchiViewProps) {
  const classes = gotchiViewStyles();

  const [totalItemsValue, setTotalItemsValue] = useState<number>(0);

  useEffect(() => {
    const wearables: number[] = gotchi.equippedWearables.filter(
      (id: number) => id !== 0 && ItemUtils.getSlotsById(id)[0] !== 'Background'
    );

    if (wearables.length !== 0) {
      const promises: Promise<any>[] = wearables.map((id: number) =>
        TheGraphApi.getErc1155Price(id, true, Erc1155Categories.Wearable, 'timeLastPurchased', 'desc')
      );

      Promise.all(promises).then((response: any) => {
        setTotalItemsValue((stateValue: number) =>
          response.reduce((result: number, current: any) => {
            return result + current.price || 0;
          }, stateValue)
        );
      });
    }
  }, [gotchi.equippedWearables]);

  return (
    <div className={classes.gotchiView}>
      <div className={classes.wearables}>
        <WearableSlot id={gotchi.equippedWearables[WearableTypes.Head]} slotId={WearableTypes.Head} />
        <WearableSlot id={gotchi.equippedWearables[WearableTypes.Face]} slotId={WearableTypes.Face} />
        <WearableSlot id={gotchi.equippedWearables[WearableTypes.RHand]} slotId={WearableTypes.RHand} />
        <WearableSlot id={gotchi.equippedWearables[WearableTypes.Background]} slotId={WearableTypes.Background} />
      </div>
      <div className={classes.gotchiCenter}>
        <div className={classes.centerHead}>
          <GotchiInfoItem
            label='Rarity'
            value={`${gotchi.modifiedRarityScore}(${gotchi.baseRarityScore})`}
            className={classes.rarity}
          />
          <GotchiCollateral collateral={gotchi.collateral} className={classes.collateral} />
        </div>
        <GotchiImage id={gotchi.id} equippedSetName={gotchi.equippedSetName} />
        <GotchiLevel level={gotchi.level} experience={gotchi.experience} toNextLevel={gotchi.toNextLevel} />
        <GotchiEquipmentPrice price={totalItemsValue} />
      </div>
      <div className={classes.wearables}>
        <WearableSlot id={gotchi.equippedWearables[WearableTypes.Eyes]} slotId={WearableTypes.Eyes} />
        <WearableSlot id={gotchi.equippedWearables[WearableTypes.Body]} slotId={WearableTypes.Body} />
        <WearableSlot id={gotchi.equippedWearables[WearableTypes.LHand]} slotId={WearableTypes.LHand} />
        <WearableSlot id={gotchi.equippedWearables[WearableTypes.Pet]} slotId={WearableTypes.Pet} />
      </div>
    </div>
  );
}
