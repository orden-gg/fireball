import { alpha } from "@mui/material";

import { makeStyles } from "@mui/styles";

const styles = makeStyles( theme => ({
    container: {
        maxWidth: 1232,
        margin: '0 auto',
        padding: 12,
        backgroundColor: alpha(theme.palette.secondary.dark, .5),
        borderRadius: 4,
    },
    profileLogged: {
        position: 'relative',
        color: theme.palette.success.main,

        '&.error': {
            color: theme.palette.warning.main
        }
    },
    profileInvalidText: {
        position: 'absolute',
        right: 0,
        bottom: -16,
        whiteSpace: 'nowrap',
        fontSize: 12,
        color: theme.palette.error.main
    }
}));

export default styles;