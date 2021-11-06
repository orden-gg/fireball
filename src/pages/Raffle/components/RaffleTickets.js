import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Ticket from '../../../components/Items/Ticket/Ticket';
import web3 from '../../../api/web3';

const useStyles = makeStyles((theme) => ({
    list: {
        display: 'grid',
        alignItems: 'start',
        gap: 12,
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gridAutoRows: '1fr',
        marginTop: 16,
        minHeight: 125
    },
    listItem: {
        height: '100%'
    },
}));

export default function RaffleTickets({address}) {
    const classes = useStyles();

    const [tickets, setTickets] = useState([]);
    const [loadingTickets, setLoadingTickets] = useState(true);

    useEffect(() => {
        let controller = new AbortController();

        getTickets(controller);

        return () => controller?.abort(); // cleanup on destroy
    },[address]);

    const getTickets = (controller) => {
        setLoadingTickets(true);

        web3.getTicketsByAddress(address).then((response) => {
            let modified = response.filter((item) => item.balance > 0);
            if(!controller.signal.aborted) {
                setTickets(modified);
                setLoadingTickets(false);
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div>
            {loadingTickets ? (
                <div className={classes.list}>
                    <span>Loading...</span>
                </div>
            ) : (
                tickets.length ? (
                    <div className={classes.list}>
                        {tickets.map((ticket, i)=>{
                            return <div className={classes.listItem}  key={i}>
                                <Ticket ticket={ticket} />
                            </div>
                        })}
                    </div>
                ) : (
                    null
                )
            )}
        </div>
    );
}