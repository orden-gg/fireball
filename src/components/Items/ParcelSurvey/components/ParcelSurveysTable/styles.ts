import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const parcelSurveysTableStyles = makeStyles((theme) =>
  createStyles({
    surveysTable: {
      '& th': {
        color: theme.palette.warning.main
      },
      '& td': {
        backgroundColor: alpha(theme.palette.common.black, 0.15),
        borderTop: `1px solid ${theme.palette.background.secondary}`
      }
    },
    surveysTableCell: {
      borderBottom: 'none',
      fontSize: 'inherit',
      whiteSpace: 'nowrap'
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
