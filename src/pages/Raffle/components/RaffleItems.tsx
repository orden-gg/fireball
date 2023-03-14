import React from 'react';

import classNames from 'classnames';

import { Erc721Categories, Erc1155Categories } from 'shared/constants';

import {
  CardBalance,
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
import { ParcelGeneric } from 'components/Items/Parcel/ParcelGeneric';
import { RealmGeneric } from 'components/Items/Parcel/RealmGeneric';

import { InstallationsUtils, ItemUtils } from 'utils';

import { itemsStyles } from '../styles';
import { RaffleItemChance } from './RaffleItemChance';

interface RaffleItemsProps {
  tickets: CustomAny;
  type: string;
}

export function RaffleItems({ tickets, type }: RaffleItemsProps) {
  const classes = itemsStyles();

  const renderItem = (item: CustomAny): JSX.Element => {
    switch (type) {
      case 'realm-generic':
        return (
          <RealmGeneric
            realm={{
              size: item.id,
              balance: item.quantity
            }}
            raffleChances={{
              chance: item.chance,
              won: item.won,
              quantity: item.quantity
            }}
          ></RealmGeneric>
        );
      case 'realm':
        return (
          <ParcelGeneric
            parcel={{
              size: item.id,
              balance: item.quantity
            }}
            raffleChances={{
              chance: item.chance,
              won: item.won,
              quantity: item.quantity
            }}
          ></ParcelGeneric>
        );
      case 'portals':
        return (
          <ItemCard type='haunt2'>
            <CardGroup name='header'>
              <CardBalance balance={item.quantity} />
            </CardGroup>
            <CardGroup name='body'>
              <CardPortalImage category={Erc721Categories.ClosedPortal} hauntId='2' />
              <CardName>H2 Portal</CardName>
              <RaffleItemChance
                stats={{
                  chance: item.chance,
                  won: item.won,
                  quantity: item.quantity
                }}
              />
            </CardGroup>
          </ItemCard>
        );
      case 'wearables':
        return (
          <ItemCard id={item.id} category={Erc1155Categories.Wearable} type={ItemUtils.getRarityNameById(item.id)}>
            <CardGroup name='header'>
              <CardSlot id={item.id} />
              <CardTotalPrice balance={item.quantity} priceInWei={item.priceInWei} />
              <CardBalance balance={item.quantity} />
            </CardGroup>
            <CardGroup name='body'>
              <CardImage id={item.id} />
              <CardName id={item.id} />
              <CardStats stats={ItemUtils.getTraitModifiersById(item.id)} />
              <RaffleItemChance
                stats={{
                  chance: item.chance,
                  won: item.won,
                  quantity: item.quantity
                }}
              />
            </CardGroup>
            <CardGroup name='footer'>
              <CardListing />
            </CardGroup>
          </ItemCard>
        );
      case 'installations':
        return (
          <ItemCard
            id={item.id}
            category={Erc1155Categories.Installation}
            type={InstallationsUtils.getRarityById(item.id)}
          >
            <CardGroup name='header'>
              <CardTotalPrice balance={item.quantity} priceInWei={item.priceInWei} />
              <CardBalance balance={item.quantity} />
            </CardGroup>
            <CardGroup name='body'>
              <CardImage id={item.id} category={Erc1155Categories.Installation} />
              <CardName id={item.id} />
              <RaffleItemChance
                stats={{
                  chance: item.chance,
                  won: item.won,
                  quantity: item.quantity
                }}
              />
            </CardGroup>
            <CardGroup name='footer'>
              <CardListing />
            </CardGroup>
          </ItemCard>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className={classes.list}>
      {tickets
        .slice(0)
        .reverse()
        .map((ticket: CustomAny, ticketIndex: number) => {
          if (ticket.prizes) {
            return ticket.prizes.map((item: CustomAny, i: number) => {
              const clean = tickets.some((t: CustomAny) => t['value'] !== '');

              return (
                <div className={classNames(classes.listItem, item.chance && 'highlight', !clean && 'clean')} key={i}>
                  {renderItem(item)}
                </div>
              );
            });
          } else {
            return <React.Fragment key={ticketIndex}></React.Fragment>;
          }
        })}
    </div>
  );
}
