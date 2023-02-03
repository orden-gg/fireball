import { Typography } from '@mui/material';

import { styles } from './styles';

type ListingTitleProps = {
  icon: JSX.Element;
  title: string;
};

export function ListingTitle({ icon, title }: ListingTitleProps) {
  const classes = styles();

  return (
    <div className={classes.listingsTitleWrapper}>
      {icon}
      <Typography className={classes.listingsTitle} variant='subtitle1'>
        {title}
      </Typography>
    </div>
  );
}
