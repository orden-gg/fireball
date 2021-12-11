
import { alpha } from "@mui/material";
import { makeStyles } from "@mui/styles";

const styles = makeStyles( theme => ({

    guildsWrapper: {
        position: 'relative',
        maxWidth: 1920,
        padding: theme.spacing(2),
        margin: 'auto'
    },
    guildsTitle: {
        textAlign: 'center',
        fontSize: 36,
        marginTop: 50
    },
    guildsList: {
        padding: 0,
        display: "grid",
        gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))',
        gridGap: '60px 20px',
        marginTop: 60
    },
    guildItem: {
        textAlign: 'center',
    },
    guildLink: {
        color: theme.palette.text.primary,
        width: '100%',
        cursor: 'pointer',

        '&:disabled': {
            opacity: .5,
            cursor: 'default'
        },

        '&:not([disabled]):hover': {
            color: theme.palette.primary.main,

            '& $guildLogo': {
                transform: 'translateY(-8%)'
            }
        }
    },
    guildName: {
        fontWeight: 700,
        transition: 'color .2s linear',
        
        fontSize: 24,
        margin: '15px 0 0'
    },
    guildLogo: {
        width: '80%',
        margin: 'auto',
        position: 'relative',
        paddingBottom: '50%',
        transition: 'transform .2s ease-out'
    },
    guildLogoImage: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        // width: '100%',
        // height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    guildLogoPlaceholder: {
        '& path': {
            fill: alpha(theme.palette.secondary.dark, .7)
        }
    }

}));

const guildStyles = makeStyles( theme => ({

    guildWrapper: {
        position: 'relative',
        paddingTop: 30
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 20,
        
        '& .MuiSvgIcon-root': {
            fontSize: 30,
            transition: 'translate .2s ease'
        },

        '&:hover': {
            color: theme.palette.primary.main
        }
    },
    backdrop: {
        zIndex: theme.zIndex.appBar - 1,
        color: '#fff'
    },
    backdropBox: {
        width: 200,
        animation: '3s ease infinite $bounceLogo'
    },
    backdropImage: {
        width: '100%',
        transition: '.5s linear',
        willChange: 'transform, opacity',

        '&.out': {
            opacity: 0,
            transform: 'scale(2)'
        },

        '& path': {
            fill: theme.palette.secondary.dark
        }
    },
    '@keyframes bounceLogo': {
        '50%': { 
            transform: 'translateY(-20%)'
        }
    }

}));

const guildBanner = makeStyles( theme => ({
    guildBanner: {
        maxWidth: 1920,
        margin: 'auto',
    },
    guildBannerInner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px 0 20px'
    },
    guildBannerText: {
        fontSize: 28,
        flexGrow: 1,
        width: '100%'
    },
    guildLogo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 50px',
        minWidth: 300,
        transform: 'translateY(-50px)',
        opacity: 0,
        animation: '2s ease-out .2s forwards $show, 2s ease-out .2s forwards $move',
    },
    guildLogoImage: {
        maxHeight: 200
    },
    guildLogoPlaceholder: {
        '& path': {
            fill: theme.palette.secondary.dark
        }
    },
    guildMembers: {
        textAlign: 'right',
        transform: 'translateX(-50px)',
        opacity: 0,
        animation: '2s ease-out .2s forwards $show, 2s ease-out .2s forwards $move',

        '& span': {
            color: theme.palette.primary.main,
            marginLeft: 15
        }
    },
    guildGotchis: {
        transform: 'translateX(50px)',
        opacity: 0,
        animation: '2s ease-out .2s forwards $show, 2s ease-out .2s forwards $move',

        '& span': {
            color: theme.palette.primary.main,
            marginRight: 15
        }
    },
    guildName: {
        textAlign: 'center',
        color: theme.palette.primary.main,
        fontSize: 50,
        opacity: 0,
        animation: '1s ease .5s forwards $show'
    },
    '@keyframes show': {
        '100%': { 
            opacity: 1
        }
    },
    '@keyframes move': {
        '100%': { 
            transform: 'none'
        }
    }
}));

const gotchisStyles = makeStyles( theme => ({
    guildGotchis: {
        background: theme.palette.background.secondary,
        paddingTop: 20,
        marginTop: theme.spacing(5)
    },
    guildGotchisInner: {
        // overflowY: 'auto',
        padding: theme.spacing(2),
        // maxHeight: '100%',
        // width: '100%',
        // alignItems: 'start',
        maxWidth: 1920,
        margin: 'auto',
        gap: theme.spacing(2),
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        display: 'grid',
    },
    memberName: {
        textAlign: 'center'
    },
    memberGotchis: {
        gap: theme.spacing(2),
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        display: 'grid',
    },
    item: {
        // margin: 5
    },
    gotchi: {
        borderRadius: 4,
        width: 150,
        padding: 30,
        transition: 'background-color .3s ease-in-out',
        '& img': {
            height: 90,
            width: 90,
            filter: 'drop-shadow( 0px 0px 7px rgba(255,255,209,.5))'
        },
        '&:hover': {
            textDecoration: 'none',
            backgroundColor: alpha(theme.palette.primary.main, .1)
        }
    },
    gotchiName: {
        textAlign: 'center',
        fontSize: 20,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        paddingBottom: 15
    },
}));

export {
    styles as default,
    guildStyles,
    guildBanner,
    gotchisStyles
}