import { createStyles, makeStyles } from '@mui/styles';

export const parcelClaimStyles = makeStyles((theme) =>
  createStyles({
    claimList: {
      marginTop: theme.spacing(1.5),
      fontSize: 5,
      position: 'relative',
      zIndex: 4,
      '.parcel:hover &': {
        fontSize: 12
      }
    },
    textCenter: {
      width: '100%'
    },
    rateAverage: {
      padding: theme.spacing(0, 1),
      backgroundImage: 'linear-gradient(to bottom, transparent 0%, #110414 50%)'
    }
  })
);
