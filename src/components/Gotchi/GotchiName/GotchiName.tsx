import { Link } from '@mui/material';

import { styles } from './styles';

export function GotchiName({ gotchi }: { gotchi: any }) {
    const classes = styles();

    return (
        <Link
            className={classes.gotchiName}
            href={`https://app.aavegotchi.com/gotchi/${gotchi.id}`}
            target='_blank'
            underline='none'
        >
            <p>{gotchi.name ? gotchi.name : 'Unnamed'}</p>
            <span className={classes.gotchiId}>({gotchi.id})</span>
        </Link>
    );
}
