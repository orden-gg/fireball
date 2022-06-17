import classNames from 'classnames';

import { ParcelGeneric } from 'components/Items/Parcel/ParcelGeneric';
import { RealmGeneric } from 'components/Items/Parcel/RealmGeneric';
import { PortalGeneric } from 'components/Items/Portal/PortalGeneric';
import { Wearable } from 'components/Items/Wearable/Wearable';
import { Installation } from 'components/Items/Installation/Installation';
import installationsUtils from 'utils/installationsUtils';

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
                return <PortalGeneric
                    portal={{
                        id: item.id,
                        balance: item.quantity
                    }}
                    raffleChances={{
                        chance: item.chance,
                        won: item.won,
                        quantity:item.quantity
                    }}
                ></PortalGeneric>;
            case 'wearables':
                return <Wearable
                    wearable={{
                        id: item.id,
                        balance: item.quantity,
                        category: 0
                    }}
                    raffleChances={{
                        chance: item.chance,
                        won: item.won,
                        quantity:item.quantity
                    }}
                ></Wearable>;
            case 'installations':
                return <Installation
                    installation={{
                        id: item.id,
                        balance: item.quantity,
                        category: 0,
                        name: installationsUtils.getNameById(item.id)
                    }}
                    raffleChances={{
                        chance: item.chance,
                        won: item.won,
                        quantity:item.quantity
                    }}
                ></Installation>;
            default:
                return <></>;
        }
    };

    return (
        <div className={classes.list}>
            {
                tickets.slice(0).reverse().map((ticket) => {

                    if (ticket.prizes) return ticket.prizes.map((item, i) => {
                        const clean = tickets.some(t => t['value'] !== '');

                        return <div
                            className={classNames(classes.listItem, item.chance && 'highlight', !clean && 'clean' )}
                            key={i}
                        >
                            {renderItem(item)}
                        </div>;
                    });

                    return <></>;
                })
            }
        </div>
    );
}
