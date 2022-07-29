import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(theme => createStyles({
    slot: {
        marginLeft: 'auto',
        minWidth: 34,
        color: theme.palette.common.white,
        opacity: .2,
        fontSize: 12,
        fontWeight: 600,
        padding: 0,
        transition: 'opacity .2s ease-in-out',
        textShadow: `${theme.palette.secondary.dark} 2px 2px 0px,
                    ${theme.palette.secondary.main} -1px -1px 0px,
                    ${theme.palette.secondary.main} 1px -1px 0px,
                    ${theme.palette.secondary.main} -1px 1px 0px,
                    ${theme.palette.secondary.main} 1px 1px 0px`
    }
}));
