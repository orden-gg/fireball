import { useContext } from 'react';

import { ClientContext } from 'contexts/ClientContext';

import { Erc1155Categories } from 'shared/constants';

import { ContentInner } from 'components/Content/ContentInner';
import {
  CardBalance,
  CardGroup,
  CardImage,
  CardListing,
  CardName,
  CardTotalPrice
} from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';

import { routersStyles } from '../styles';

export function ClientTickets() {
  const classes = routersStyles();
  const { tickets, loadingTickets } = useContext<any>(ClientContext);

  return (
    <ContentInner dataLoading={loadingTickets}>
      <div>
        <div className={classes.list}>
          {tickets.map((ticket: any, index: number) => (
            <div className={classes.listItem} key={index}>
              <ItemCard type={ticket.name} category={Erc1155Categories.Ticket} id={ticket.id}>
                <CardGroup name='header'>
                  <CardTotalPrice balance={ticket.balance} priceInWei={ticket.priceInWei} />
                  <CardBalance balance={ticket.balance} />
                </CardGroup>
                <CardGroup name='body'>
                  <CardImage id={ticket.id} category={Erc1155Categories.Ticket} />
                  <CardName>{ticket.name}</CardName>
                </CardGroup>
                <CardGroup name='footer'>
                  <CardListing />
                </CardGroup>
              </ItemCard>
            </div>
          ))}
        </div>
      </div>
    </ContentInner>
  );
}
