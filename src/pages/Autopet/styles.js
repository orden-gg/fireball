
import { alpha } from "@mui/material";
import { makeStyles } from "@mui/styles";

const styles = makeStyles( theme => ({
    autopetWrapper: {
        padding: theme.spacing(3),
        maxWidth: 1400,
        margin: 'auto'
    }
}));

const headerStyles = makeStyles( theme => ({
    autopetTitle: {
        textAlign: 'center',
        fontSize: 40,
        marginBottom: 0
    },
    autopetComplete: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 500
    },
    autopetCount: {
        width: 55,
        height: 55,
        position: 'relative',
        // fontSize: 10,
        display: 'inline-block',
        marginLeft: theme.spacing(1)
    },
    autopetCountText: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    autopetProggress: {
        position: 'absolute',
        left: 0,
        top: 0
    },
    autopetProggressUnder: {

        '& .MuiCircularProgress-circle': {
            color: theme.palette.background.secondary
        }
    },
    autopetProggressOver: {

        '& .MuiCircularProgress-circle': {
            // color: alpha(theme.palette.common.white, .1)
            color: theme.palette.background.paper
        }
    }
}));

const tabStyles = makeStyles( theme => ({

    tabsWrapper: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(5),
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
        '&[aria-selected="true"]': {
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
    tabDoneText: {
        color: theme.palette.success.light
    },
    tabIcon: {
        position: 'absolute',
        left: -18,
        top: '50%',
        marginTop: -12,
        color: theme.palette.common.white,
        zIndex: 1
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

const infoStyles = makeStyles( theme => ({
    autopetInfo: {
        display: 'flex',
        justifyContent: 'center',
        margin: theme.spacing(5, 0)
    },
    autopetInfoCard: {
        backgroundColor: theme.palette.background.paper,
        height: 150,
        borderRadius: 5,
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
        textTransform: 'uppercase',
        fontWeight: 700,
        boxSizing: 'border-box',
        maxWidth: 360,
        margin: theme.spacing(0, 2),
        minWidth: 360,
        textAlign: 'center',
        padding: theme.spacing(2)
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
        fontSize: 65,
        minWidth: '50%',
    },
    autopetInfoIcon: {
        position: 'absolute',
        right: theme.spacing(.5),
        bottom: theme.spacing(.5)
    }
}));

export {
    styles as default,
    headerStyles,
    tabStyles,
    infoStyles
}