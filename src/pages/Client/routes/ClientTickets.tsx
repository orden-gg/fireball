import { useContext } from 'react';

import { Erc1155Categories } from 'shared/constants';
import { ContentInner } from 'components/Content/ContentInner';
import { CardBalance, CardBody, CardImage, CardInner, CardListings, CardName, CardTotalPrice, ItemCard } from 'components/ItemCard';
import { ClientContext } from 'contexts/ClientContext';

import { routersStyles } from '../styles';

export function ClientTickets() {
    const classes = routersStyles();
    const { tickets, loadingTickets } = useContext<any>(ClientContext);

    return (
        <ContentInner dataLoading={loadingTickets} offset={208}>
            <div className={classes.list}>
                {
                    tickets.map(({ name, balance, id, priceInWei }: any, i: number) =>
                        <div className={classes.listItem} key={i}>
                            <ItemCard type={name}>
                                <CardInner>
                                    <CardTotalPrice
                                        id={id}
                                        balance={balance}
                                        category={Erc1155Categories.Ticket}
                                        priceInWei={priceInWei}
                                    />
                                    <CardBalance balance={balance} />
                                </CardInner>
                                <CardBody>
                                    <CardImage id={id} category={Erc1155Categories.Ticket} />
                                    <CardName>{name}</CardName>
                                </CardBody>
                                <CardInner>
                                    <CardListings id={id} category={Erc1155Categories.Ticket} />
                                </CardInner>
                            </ItemCard>
                        </div>
                    )
                }
            </div>
        </ContentInner>
    );
}
