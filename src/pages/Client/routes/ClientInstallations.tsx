// store
import * as fromClientStore from '../store';
import { useAppSelector } from 'core/store/hooks';

import { ContentInner } from 'components/Content/ContentInner';
import {
  CardBalance,
  CardCraftLink,
  CardGroup,
  CardImage,
  CardListing,
  CardName,
  CardTotalPrice
} from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';

import { InstallationAndTile } from '../models';

export function ClientInstallations() {
  const installations: InstallationAndTile[] = useAppSelector(fromClientStore.getInstallations);
  const isInitialInstallationsLoading: boolean = useAppSelector(fromClientStore.getIsInitialInstallationsLoading);
  const tiles: InstallationAndTile[] = useAppSelector(fromClientStore.getTiles);
  const isInitialTilesLoading: boolean = useAppSelector(fromClientStore.getIsInitialTilesLoading);

  return (
    <>
      <ContentInner dataLoading={isInitialInstallationsLoading || isInitialTilesLoading}>
        <ItemsLazy
          items={[...installations, ...tiles]}
          component={(item: InstallationAndTile) => (
            <ItemCard id={item.id} category={item.category} type={item.rarity || 'drop'}>
              <CardGroup name='header'>
                {!item.deprecated ? <CardCraftLink name={item.name} /> : <></>}
                <CardTotalPrice balance={item.balance} priceInWei={item.priceInWei} />
                <CardBalance balance={item.balance} />
              </CardGroup>
              <CardGroup name='body'>
                <CardImage id={item.id} category={item.category} />
                <CardName>{item.name}</CardName>
              </CardGroup>
              <CardGroup name='footer'>
                <CardListing />
              </CardGroup>
            </ItemCard>
          )}
        />
      </ContentInner>
    </>
  );
}
