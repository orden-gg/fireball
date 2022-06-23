import { useContext } from 'react';

import { ContentInner } from 'components/Content/ContentInner';
import { Ticket } from 'components/Items/Ticket/Ticket';
import { ClientContext } from 'contexts/ClientContext';

import { routersStyles } from '../styles';

export function ClientTickets() {
    const classes = routersStyles();
    const { tickets, loadingTickets } = useContext<any>(ClientContext);

    return (
        <ContentInner dataLoading={loadingTickets} offset={208}>
            <div className={classes.list}>
                {
                    tickets.map((ticket: any, i: number) => {
                        return <div className={classes.listItem} key={i}>
                            <Ticket ticket={ticket} />
                        </div>;
                    })
                }
            </div>
        </ContentInner>
    );
}
