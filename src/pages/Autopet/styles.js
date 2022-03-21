
import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(theme => ({
    autopetWrapper: {
        padding: theme.spacing(3),
        maxWidth: 1400,
        margin: 'auto'
    }
}));

const headerStyles = makeStyles(theme => ({
    autopetTitle: {
        textAlign: 'center',
        fontSize: 40,
        marginBottom: 0
    },
    autopetTerms: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(3)

    },
    autopetTermsBox: {
        borderRadius: 5,
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        backgroundColor: theme.palette.background.paper,
        flexBasis: `calc(50% - ${theme.spacing(1)})`,
        padding: theme.spacing(3)
    },
    autopetTermsTitle: {
        margin: theme.spacing(0, 0, 2),
        textAlign: 'center',
        fontSize: 20
    },
    autopetTermsText: {
        margin: theme.spacing(1, 0),
        position: 'relative',
        paddingLeft: theme.spacing(2),

        '&:before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: theme.spacing(1.2),
            width: 7,
            height: 7,
            borderRadius: 7,
            backgroundColor: theme.palette.common.white
        }
    },
    autopetHeaderWarning: {
        marginTop: theme.spacing(2)
    },
    autopetTermsTextHighlight: {
        color: theme.palette.success.light
    }
}));

const tabStyles = makeStyles(theme => ({
    autopetComplete: {
        fontWeight: 500,
        margin: theme.spacing(1, 0),
        textAlign: 'right'
    },

    tabsWrapper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        borderRadius: '0 0 5px 5px'
    },
    tabs: {
        background: '#343740',
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
    },
    tab: {
        minHeight: 48,
        position: 'relative',
        overflow: 'visible',
        opacity: 1,
        '&[aria-selected=true]': {
            backgroundColor: 'rgba(52, 55, 64, 0.3)'
        },
        '&:hover': {
            backgroundColor: alpha(theme.palette.background.paper, .3)
        }
    },
    tabDone: {
        opacity: .8,
        backgroundColor: 'rgba(52, 55, 64, 1)'
    },
    tabIcon: {
        position: 'absolute',
        left: -18,
        top: '50%',
        marginTop: -12,
        color: theme.palette.common.white,
        zIndex: 1
    },
    tabArrow: {
        color: theme.palette.success.light,
        width: 22
    },
    tabGotchi: {
        display: 'inline-block',
        width: 20

    },
    tabPanel: {
        padding: theme.spacing(5),
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    panelText: {
        textAlign: 'center',
    },
    panelError: {
        fontSize: 12,
        textAlign: 'center',
        color: theme.palette.error.light
    },
    panelButtonGroup: {
        display: 'flex',
        maxWidth: 1000,
        margin: theme.spacing(4, 'auto', 0),
        justifyContent: 'center',
        width: '100%'
    },
    panelButton: {
        maxWidth: 325,

        '& + &': {
            marginLeft: theme.spacing(1.5)
        }
    },
    panelButtonCitcular: {
        marginLeft: theme.spacing(1),
        color: 'inherit',
    }

}));

const infoStyles = makeStyles(theme => ({
    autopetInfo: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: theme.spacing(1, 0)
    },
    autopetInfoCard: {
        height: 100,
        borderRadius: 5,
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 700,
        boxSizing: 'border-box',
        margin: theme.spacing(1),
        minWidth: 380,
        textAlign: 'center',
        padding: theme.spacing(2),
    },
    autopetInfoLink: {
        position: 'relative',

        '&:hover': {
            textDecoration: 'underline'
        }
    },
    autopetCardName: {
        margin: '0 auto'
    },
    autopetCardCount: {
        fontSize: 42,
        minWidth: '50%',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    autopetCardCountLabel: {
        fontSize: 18
    },
    autopetInfoIcon: {
        position: 'absolute',
        right: theme.spacing(.5),
        bottom: theme.spacing(.5)
    },
    autopetInfoGhst: {
        width: 48,
        height: 48
    }
}));

export {
    styles as default,
    headerStyles,
    tabStyles,
    infoStyles
}
