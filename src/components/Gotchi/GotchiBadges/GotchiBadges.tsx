import { useEffect, useState } from 'react';

import { MainApi } from 'api';

import { GotchiUtils, ItemUtils } from 'utils';

import { Erc1155Categories } from 'shared/constants';
import { Gotchi, GotchiInventory } from 'shared/models';

import { CardImage, CardName } from 'components/ItemCard/components';
import { CustomTooltip } from 'components/custom/CustomTooltip';

import { gotchiBadgesStyles } from './styles';

export function GotchiBadges({ id }: { id: number }) {
  const classes = gotchiBadgesStyles();

  const [badges, setBadges] = useState<GotchiInventory[]>([]);

  useEffect(() => {
    let mounted: boolean = true;

    MainApi.getAavegotchiById(id).then((response: any[]) => {
      if (mounted) {
        const gotchi: Gotchi = GotchiUtils.convertDataFromContract(response);
        const badges: GotchiInventory[] = gotchi.inventory.filter((item: GotchiInventory) => {
          const slot = ItemUtils.getSlotsById(item.id);

          return slot.length === 0;
        });

        setBadges(badges.reverse());
      }
    });

    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <div className={classes.badges}>
      {badges.map((item: GotchiInventory, index: number) => (
        <CustomTooltip title={<CardName id={item.id} className={classes.name} />} placement='top' key={index} arrow>
          <div className={classes.badge}>
            <CardImage id={item.id} category={Erc1155Categories.Wearable} className={classes.badgeImage} />
          </div>
        </CustomTooltip>
      ))}
    </div>
  );
}
