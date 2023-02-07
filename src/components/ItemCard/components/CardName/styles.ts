import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme =>
  createStyles({
    name: {
      fontWeight: 500,
      lineHeight: 1.4,
      textTransform: 'capitalize',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      textAlign: 'center',
      maxWidth: '100%',
      textShadow: `${theme.palette.secondary.dark} 2px 2px 0px,
                    ${theme.palette.secondary.main} -1px -1px 0px,
                    ${theme.palette.secondary.main} 1px -1px 0px,
                    ${theme.palette.secondary.main} -1px 1px 0px,
                    ${theme.palette.secondary.main} 1px 1px 0px`
    }
  })
);
