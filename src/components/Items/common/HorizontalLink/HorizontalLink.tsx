import { Link } from '@mui/material';
import CallMade from '@mui/icons-material/CallMade';

import { styles } from './styles';

export function HorizontalLink({ item, url }: { item: any, url: string }) {
    const classes = styles();

    return (
        <Link
            className={classes.linkName}
            href={`${url}${item.listingID || item.id}`}
            target='_blank'
            underline='none'
            key={`${item.id}-name`}
        >
            <p>Open in Baazaar</p>
            <CallMade className={classes.callMadeIcon} />
        </Link>
    );
}
