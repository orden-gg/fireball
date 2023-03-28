import CallMade from '@mui/icons-material/CallMade';
import { Link } from '@mui/material';

import { styles } from './styles';

export function HorizontalLink({ item, url }: { item: CustomAny; url: string }) {
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
