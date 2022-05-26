import React, { useContext } from 'react';

import ContentInner from 'components/Content/ContentInner';
import Ticket from 'components/Items/Ticket/Ticket';
import { ClientContext } from 'contexts/ClientContext';

import { routersStyles } from '../styles';
import Countdown from 'components/Countdown/Countdown';

export default function ClientTickets() {
    const endDate = new Date(1653650851841);
    const classes = routersStyles();
    const { tickets, loadingTickets } = useContext(ClientContext);

    const shortFormat = {
        y: 'y',
        MM: 'm',
        dd: 'd',
        hh: 'h',
        mm: 'm',
        ss: 's'
    };

    const onCountDownEnd = () => {
        console.log('onCountDownEnd')
    }

    const replacementComponent = <div>Replacement Component</div>

    return (
        <ContentInner dataLoading={loadingTickets} offset={208}>
        <Countdown date={endDate} format={shortFormat} onEnd={onCountDownEnd} replacementComponent={replacementComponent} />
            <div className={classes.list}>
                {
                    tickets.map((ticket, i)=>{
                        return <div className={classes.listItem} key={i}>
                            <Ticket ticket={ticket} />
                        </div>
                    })
                }
            </div>
        </ContentInner>
    );
}
