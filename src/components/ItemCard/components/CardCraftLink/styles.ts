import { createStyles, makeStyles } from '@mui/styles';

export const cardCraftLinkStyles = makeStyles(theme =>
  createStyles({
    link: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'underline',
      margin: theme.spacing(0, 'auto', 0, 1),
      '&:hover': {
        textDecoration: 'none'
      }
    },
    icon: {
      width: 15,
      height: 15,
      display: 'block',
      marginLeft: theme.spacing(0.5)
    }
  })
);
