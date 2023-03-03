import { useAppSelector } from 'core/store/hooks';
import { Erc1155Categories } from 'shared/constants';
import { ContentInner } from 'components/Content/ContentInner';
import { ItemCard } from 'components/ItemCard/containers';
import {
  CardBalance,
  CardGroup,
  CardImage,
  CardListing,
  CardName,
  CardTotalPrice
} from 'components/ItemCard/components';

import { ClientTicket } from '../models';

import { routersStyles } from '../styles';

// store
import * as fromClientStore from '../store';

export function ClientTickets() {
  const classes = routersStyles();

  const tickets: ClientTicket[] = useAppSelector(fromClientStore.getTickets);
  const isTicketsLoading: boolean = useAppSelector(fromClientStore.getIsTicketsLoading);

  return (
    <ContentInner dataLoading={isTicketsLoading}>
      <div>
        <div className={classes.list}>
          {tickets.map((ticket: ClientTicket, index: number) => (
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
