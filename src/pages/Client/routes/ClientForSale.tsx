import { useContext } from 'react';

import { CircularProgress, Typography } from '@mui/material';

import { ItemUtils } from 'utils';

import { ClientContext } from 'contexts/ClientContext';

import { Erc1155Categories } from 'shared/constants';

import { Gotchi } from 'components/Gotchi/Gotchi';
import {
  ConsumableIcon,
  GotchiIcon,
  H1SealedPortalIcon,
  KekIcon,
  RareTicketIcon,
  WarehouseIcon
} from 'components/Icons/Icons';
import {
  CardBalance,
  CardERC721Listing,
  CardGroup,
  CardImage,
  CardListing,
  CardName,
  CardPortalImage,
  CardSlot,
  CardStats,
  CardTotalPrice
} from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { Parcel } from 'components/Items/Parcel/Parcel';

import { ListingTitle } from '../components/ListingTitle/ListingTitle';
import { forSaleStyles } from '../styles';

export function ClientForSale() {
  const classes = forSaleStyles();

  const { itemsForSale, isItemsForSaleLoading, isItemsForSaleEmpty } = useContext<any>(ClientContext);

  const loaderRender = (): JSX.Element => {
    if (isItemsForSaleLoading) {
      return (
        <div className={classes.loaderBox}>
          <CircularProgress color='primary' />
        </div>
      );
    } else if (isItemsForSaleEmpty) {
      return (
        <Typography className={classes.noListings} variant='caption'>
          No items for sale here :(
        </Typography>
      );
    } else {
      return <></>;
    }
  };

  const renderCardStats = (id: number, category: string): JSX.Element => {
    const isWearable: boolean = category === Erc1155Categories.Wearable;
    const stats: any = isWearable ? ItemUtils.getTraitModifiersById(id) : ItemUtils.getDescriptionById(id);

    return <CardStats stats={stats} />;
  };

  return (
    <div className={classes.container}>
      {loaderRender()}

      {itemsForSale.gotchis.length > 0 && (
        <>
          <ListingTitle icon={<GotchiIcon width={32} height={32} />} title='Gotchis' />

          <div className={classes.list}>
            {itemsForSale.gotchis.map((gotchi) => (
              <div className={classes.listItem} key={gotchi.id}>
                <Gotchi
                  gotchi={gotchi}
                  render={[
                    {
                      className: 'gotchiHeader',
                      items: ['collateral', 'kinship', 'level']
                    },
                    {
                      className: 'imageContainer',
                      items: [
                        'svg',
                        {
                          className: 'rsContainer',
                          items: ['rs', 'skillpoints']
                        }
                      ]
                    },
                    'name',
                    'traits',
                    'wearablesLine',
                    'listing',
                    'rewards'
                  ]}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {itemsForSale.wearables.length > 0 && (
        <>
          <ListingTitle icon={<WarehouseIcon width={32} height={32} />} title='Wearables' />

          <div className={classes.list}>
            {itemsForSale.wearables.map((wearable: any) => (
              <div className={classes.listItem} key={wearable.listing}>
                <ItemCard type={wearable.rarity} id={wearable.id} category={wearable.category}>
                  <CardGroup name='header'>
                    <CardSlot id={wearable.id} />
                    <CardTotalPrice balance={wearable.balance} priceInWei={wearable.priceInWei} />
                    <CardBalance balance={wearable.balance} holders={wearable.holders} />
                  </CardGroup>
                  <CardGroup name='body'>
                    <CardImage id={wearable.id} />
                    <CardName id={wearable.id} />
                    {renderCardStats(wearable.id, wearable.category)}
                  </CardGroup>
                  <CardGroup name='footer'>
                    <CardListing />
                  </CardGroup>
                </ItemCard>
              </div>
            ))}
          </div>
        </>
      )}

      {itemsForSale.parcels.length > 0 && (
        <>
          <ListingTitle icon={<KekIcon width={32} height={32} alt='parcel' />} title='Parcels' />

          <div className={classes.list}>
            {itemsForSale.parcels.map((parcel: any) => (
              <div className={classes.listItem} key={parcel.parcelId}>
                <Parcel parcel={parcel} />
              </div>
            ))}
          </div>
        </>
      )}

      {itemsForSale.portals.length > 0 && (
        <>
          <ListingTitle icon={<H1SealedPortalIcon width={32} height={32} />} title='Portals' />

          <div className={classes.list}>
            {itemsForSale.portals.map((portal: any) => (
              <div className={classes.listItem} key={portal.tokenId}>
                <ItemCard type={`haunt${portal.portal.hauntId}`} id={portal.id} category={portal.category}>
                  <CardGroup name='body'>
                    <CardSlot>{`Haunt ${portal.portal.hauntId}`}</CardSlot>
                    <CardPortalImage category={portal.category} hauntId={portal.portal.hauntId} />
                    <CardName>{`Portal ${portal.tokenId}`}</CardName>
                  </CardGroup>
                  <CardGroup name='footer'>
                    <CardERC721Listing
                      currentListingId={portal.listingId}
                      currentPrice={portal.listingPrice}
                      historicalPrices={portal.historicalPrices}
                    />
                  </CardGroup>
                </ItemCard>
              </div>
            ))}
          </div>
        </>
      )}

      {itemsForSale.tickets.length > 0 && (
        <>
          <ListingTitle icon={<RareTicketIcon width={32} height={32} />} title='Tickets' />

          <div className={classes.list}>
            {itemsForSale.tickets.map((ticket: any) => (
              <div className={classes.listItem} key={ticket.listing}>
                <ItemCard type={ticket.rarity} id={ticket.id} category={ticket.category}>
                  <CardGroup name='header'>
                    <CardTotalPrice balance={ticket.balance} priceInWei={ticket.priceInWei} />
                    <CardBalance balance={ticket.balance} holders={ticket.holders} />
                  </CardGroup>
                  <CardGroup name='body'>
                    <CardImage id={ticket.id} />
                    <CardName id={ticket.id} />
                  </CardGroup>
                  <CardGroup name='footer'>
                    <CardListing />
                  </CardGroup>
                </ItemCard>
              </div>
            ))}
          </div>
        </>
      )}

      {itemsForSale.consumables.length > 0 && (
        <>
          <ListingTitle icon={<ConsumableIcon width={32} height={32} />} title='Consumables' />

          <div className={classes.list}>
            {itemsForSale.consumables.map((consumable: any) => (
              <div className={classes.listItem} key={consumable.listing}>
                <ItemCard type={consumable.rarity} id={consumable.id} category={consumable.category}>
                  <CardGroup name='header'>
                    <CardTotalPrice balance={consumable.balance} priceInWei={consumable.priceInWei} />
                    <CardBalance balance={consumable.balance} holders={consumable.holders} />
                  </CardGroup>
                  <CardGroup name='body'>
                    <CardImage id={consumable.id} />
                    <CardName id={consumable.id} />
                  </CardGroup>
                  <CardGroup name='footer'>
                    <CardListing />
                  </CardGroup>
                </ItemCard>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
