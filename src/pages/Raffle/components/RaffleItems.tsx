import React from 'react';

import classNames from 'classnames';

import { Erc1155Categories, Erc721Categories } from 'shared/constants';
import { ItemCard } from 'components/ItemCard/containers';
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
import { ParcelGeneric } from 'components/Items/Parcel/ParcelGeneric';
import { RealmGeneric } from 'components/Items/Parcel/RealmGeneric';
import { InstallationsUtils, ItemUtils } from 'utils';

import { RaffleItemChance } from './RaffleItemChance';

import { itemsStyles } from '../styles';

interface RaffleItemsProps {
    tickets: any;
    type: string;
}

export function RaffleItems({ tickets, type }: RaffleItemsProps) {
    const classes = itemsStyles();

    const renderItem = (item: any): JSX.Element => {
        switch (type) {
            case 'realm-generic':
                return <RealmGeneric
                    realm={{
                        size: item.id,
                        balance: item.quantity
                    }}
                    raffleChances={{
                        chance: item.chance,
                        won: item.won,
                        quantity:item.quantity
                    }}
                ></RealmGeneric>;
            case 'realm':
                return <ParcelGeneric
                    parcel={{
                        size: item.id,
                        balance: item.quantity
                    }}
                    raffleChances={{
                        chance: item.chance,
                        won: item.won,
                        quantity:item.quantity
                    }}
                ></ParcelGeneric>;
            case 'portals':
                return <ItemCard type='haunt2'>
                    <CardGroup name='header'>
                        <CardBalance balance={item.quantity} />
                    </CardGroup>
                    <CardGroup name='body'>
                        <CardPortalImage category={Erc721Categories.ClosedPortal} hauntId='2' />
                        <CardName>H2 Portal</CardName>
                        <RaffleItemChance stats={{
                            chance: item.chance,
                            won: item.won,
                            quantity:item.quantity
                        }} />
                    </CardGroup>
                </ItemCard>;
            case 'wearables':
                return <ItemCard id={item.id} category={Erc1155Categories.Wearable} type={ItemUtils.getRarityNameById(item.id)}>
                    <CardGroup name='header'>
                        <CardTotalPrice
                            balance={item.quantity}
                            priceInWei={item.priceInWei}
                        />
                        <CardBalance balance={item.quantity} />
                    </CardGroup>
                    <CardGroup name='body'>
                        <CardSlot id={item.id} />
                        <CardImage id={item.id} />
                        <CardName id={item.id} />
                        <CardStats id={item.id} category={Erc1155Categories.Wearable} />
                        <RaffleItemChance stats={{
                            chance: item.chance,
                            won: item.won,
                            quantity:item.quantity
                        }} />
                    </CardGroup>
                    <CardGroup name='footer'>
                        <CardListing />
                    </CardGroup>
                </ItemCard>;
            case 'installations':
                return <ItemCard id={item.id} category={Erc1155Categories.Realm} type={InstallationsUtils.getRarityById(item.id)}>
                    <CardGroup name='header'>
                        <CardTotalPrice
                            balance={item.quantity}
                            priceInWei={item.priceInWei}
                        />
                        <CardBalance balance={item.quantity} />
                    </CardGroup>
                    <CardGroup name='body'>
                        <CardImage id={item.id} category={Erc1155Categories.Realm} />
                        <CardName id={item.id} />
                        <RaffleItemChance stats={{
                            chance: item.chance,
                            won: item.won,
                            quantity:item.quantity
                        }} />
                    </CardGroup>
                    <CardGroup name='footer'>
                        <CardListing />
                    </CardGroup>
                </ItemCard>;
            default:
                return <></>;
        }
    };

    return (
        <div className={classes.list}>
            {
                tickets.slice(0).reverse().map((ticket: any, ticketIndex: number) => {
                    if (ticket.prizes) {
                        return ticket.prizes.map((item: any, i: number) => {
                            const clean = tickets.some((t: any) => t['value'] !== '');

                            return <div
                                className={classNames(classes.listItem, item.chance && 'highlight', !clean && 'clean' )}
                                key={i}
                            >
                                {renderItem(item)}
                            </div>;
                        });
                    } else {
                        return <React.Fragment key={ticketIndex}></React.Fragment>;
                    }
                })
            }
        </div>
    );
}
