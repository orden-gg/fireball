import { createStyles, makeStyles } from '@mui/styles';

export const parcelSurveyDetailsStyles = makeStyles((theme) =>
  createStyles({
    surveysTable: {
      fontsize: 12
    },
    surveysTableCell: {
      fontSize: 'inherit',
      padding: theme.spacing(0.5, 1)
    },
    surveyDetailsIcon: {
      margin: 'auto',
      display: 'block'
    },
    surveyTableRate: {
      color: theme.palette.primary.light,
      marginLeft: theme.spacing(0.5)
    }
  })
);
