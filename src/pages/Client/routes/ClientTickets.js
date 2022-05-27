import React, { useContext } from 'react';

import { DateTime } from 'luxon';

import ContentInner from 'components/Content/ContentInner';
import Ticket from 'components/Items/Ticket/Ticket';
import { ClientContext } from 'contexts/ClientContext';

import { routersStyles } from '../styles';
import Countdown from 'components/Countdown/Countdown';

export default function ClientTickets() {
    const endDate = DateTime.fromJSDate(new Date(1784652751841)).toMillis();
    const classes = routersStyles();
    const { tickets, loadingTickets } = useContext(ClientContext);

    const shortFormat = {
        years: { key: 'y', value: 'y', showIfZero: false },
        months: { key: 'MM', value: 'm', showIfZero: false },
        days: { key: 'dd', value: 'd', showIfZero: false },
        hours: { key: 'hh', value: 'h', showIfZero: false },
        minutes: { key: 'mm', value: 'm', showIfZero: false },
        seconds: { key: 'ss', value: 's', showIfZero: false }
    };
    const longFormat = {
        years: { key: 'y', values: ['year', 'years'], showIfZero: false },
        months: { key: 'MM', values: ['month', 'months'], showIfZero: false },
        days: { key: 'dd', values: ['day', 'days'], showIfZero: false },
        hours: { key: 'hh', values: ['hour', 'hours'], showIfZero: false }
    };

    const onCountDownEnd = () => {
        console.log('onCountDownEnd')
    }

    const replacementComponent = <div>Replacement Component</div>

    return (
        <ContentInner dataLoading={loadingTickets} offset={208}>
        <Countdown targetDate={endDate} longFormat={longFormat} onEnd={onCountDownEnd} />
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
