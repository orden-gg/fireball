import * as fromForge from '../store';
import { useAppSelector } from 'core/store/hooks';

import { Erc1155Categories } from 'shared/constants';
import { ForgeItem } from 'shared/models';

import { ContentInner } from 'components/Content/ContentInner';
import { CardBalance, CardGroup, CardImage, CardName, CardSlot } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';

import { ForgeUtils } from 'utils';

export function ClientForge() {
  const forgeItems: ForgeItem[] = [...useAppSelector(fromForge.getForgeItems)].sort(
    (a: ForgeItem, b: ForgeItem) => a.category.length - b.category.length
  );
  const isInitialForgeGotchisLoading: boolean = useAppSelector(fromForge.getIsInitialForgeLoading);

  return (
    <ContentInner dataLoading={isInitialForgeGotchisLoading}>
      <ItemsLazy
        items={forgeItems}
        component={(forgeItem: ForgeItem) => (
          <ItemCard type='default'>
            <CardGroup name='header'>
              {forgeItem.slot ? <CardSlot>{forgeItem.slot}</CardSlot> : <></>}
              <CardBalance balance={forgeItem.amount} />
            </CardGroup>
            <CardGroup name='body'>
              <CardImage
                id={forgeItem.tokenId}
                category={Erc1155Categories.Forge}
                path={ForgeUtils.getItemImage(forgeItem)}
                itemName={ForgeUtils.getItemName(forgeItem)}
              />
              <CardName>{ForgeUtils.getItemName(forgeItem)}</CardName>
            </CardGroup>
          </ItemCard>
        )}
      />
    </ContentInner>
  );
}
