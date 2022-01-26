
import React, { useContext } from 'react';

import ParcelGeneric from '../../../components/Items/Parcel/ParcelGeneric';
import Wearable from '../../../components/Items/Wearable/Wearable';
import { RaffleContext } from '../../../contexts/RaffleContext';

import { itemsStyles } from '../styles';

export default function RaffleItems({tickets, type}) {
    const classes = itemsStyles();

    const { formatChance } = useContext(RaffleContext);

    const renderItem = (item) => {
        if(type === 'realm') {
            return <ParcelGeneric
                parcel={{
                    size: item.id,
                    balance: item.quantity
                }}
            ></ParcelGeneric>
        } else if(type === 'portals') {
            return <div style={{ background: '#000', padding: 8, borderRadius: 8 }}>Haunt 2 portal <br/> Quantity: {item.quantity}</div> // TODO: Generic portal component
        } else if(type === 'wearables') {
            return <Wearable
                wearable={{
                    id: item.id,
                    balance: item.quantity,
                    category: 0
                }}
            ></Wearable>
        } else {
            return null;
        }
    };
    
    return (
        <div className={classes.list}>
            {
                tickets.slice(0).reverse().map((ticket) => {

                    if(ticket.prizes) return ticket.prizes.map((item, i) => {

                        return <div className={classes.listItem} key={i} style={{ paddingTop: 40 }}>
                            {
                                item.chance ? (
                                    <div style={{  position: 'absolute', top: 0, left: 0 }}>
                                        chance: <span style={{ color: 'yellow', }}>{formatChance(item.chance, item.items)}</span>
                                    </div>
                                ) : (
                                    null
                                )
                            }
                            {
                                item.won ? (
                                    <div style={{  position: 'absolute', top: 20, left: 0 }}>
                                        won: <span style={{ color: '#1de91d', }}>{item.won}</span>
                                    </div>
                                ) : (
                                    null
                                )
                            }
                            
                            {renderItem(item)}
                        </div>
                    })
                    return null;
                })
            }
        </div>
    );
}