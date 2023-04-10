import { createStyles, makeStyles } from '@mui/styles';

export const parcelSurveyStyles = makeStyles((theme) =>
  createStyles({
    surveyList: {
      marginTop: theme.spacing(1.5),
      fontSize: 5,
      position: 'relative',
      zIndex: 4,
      '.parcel:hover &': {
        fontSize: 12
      }
    },
    surveyListHead: {
      display: 'flex',
      justifyContent: 'space-between',
      position: 'absolute',
      right: 0,
      left: 0,
      bottom: '100%',
      textAlign: 'center',
      color: theme.palette.rarity.golden,
      textShadow: '0 0 1px #000, 0 0 1px #000, 0 0 1px #000',
      fontWeight: 700,
      fontSize: 12
    },
    textCenter: {
      width: '100%'
    },
    surveyedTime: {
      padding: theme.spacing(0, 1),
      backgroundImage: 'linear-gradient(to bottom, transparent 0%, #110414 50%)'
    },
    rateAverage: {
      padding: theme.spacing(0, 1),
      backgroundImage: 'linear-gradient(to bottom, transparent 0%, #110414 50%)'
    }
  })
);
