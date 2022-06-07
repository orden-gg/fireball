import { Link } from '@mui/material';
import CallMade from '@mui/icons-material/CallMade';

import styles from './styles';

export default function HorizontalLink({ item, name, url }) {
    const classes = styles();

    return (
        <Link
            className={classes.linkName}
            href={`${url}${item.listingID || item.id}`}
            target='_blank'
            underline='none'
            key={`${item.id}-name`}
        >
            <p>{name || 'Open in Baazaar'}</p>
            <CallMade className={classes.callMadeIcon} />
        </Link>
    );
}
