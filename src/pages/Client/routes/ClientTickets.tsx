import { useContext } from 'react';

import { Erc1155Categories } from 'shared/constants';
import { ContentInner } from 'components/Content/ContentInner';
import { CardBalance, CardBody, CardFooter, CardHeader, CardImage, CardListing, CardName, CardTotalPrice, ItemCard } from 'components/ItemCard';
import { ClientContext } from 'contexts/ClientContext';

import { routersStyles } from '../styles';

export function ClientTickets() {
    const classes = routersStyles();
    const { tickets, loadingTickets } = useContext<any>(ClientContext);

    return (
        <ContentInner dataLoading={loadingTickets} offset={208}>
            <div className={classes.list}>
                {
                    tickets.map((ticket: any, index: number) =>
                        <div className={classes.listItem} key={index}>
                            <ItemCard type={ticket.name} category={Erc1155Categories.Ticket} id={ticket.id}>
                                <CardHeader>
                                    <CardTotalPrice
                                        balance={ticket.balance}
                                        priceInWei={ticket.priceInWei}
                                    />
                                    <CardBalance balance={ticket.balance} />
                                </CardHeader>
                                <CardBody>
                                    <CardImage id={ticket.id} category={Erc1155Categories.Ticket} />
                                    <CardName>{ticket.name}</CardName>
                                </CardBody>
                                <CardFooter>
                                    <CardListing />
                                </CardFooter>
                            </ItemCard>
                        </div>
                    )
                }
            </div>
        </ContentInner>
    );
}
