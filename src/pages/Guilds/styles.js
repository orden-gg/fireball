
import { alpha } from "@mui/material";
import { makeStyles } from "@mui/styles";

const keyframes = {

    move: {
        '100%': { 
            transform: 'none'
        }
    },
    bounce: {
        '50%': { 
            transform: 'translateY(-20%)'
        }
    },
    show: {
        '100%': { 
            opacity: 1
        }
    }

}

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
    guildButton: {
        color: theme.palette.text.primary,
        width: '100%',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: 0,

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
        position: 'relative'
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 20,
        zIndex: 1,
        
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
        animation: '3s ease infinite $bounce'
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
    '@keyframes bounce': keyframes.bounce
}));

const guildBanner = makeStyles( theme => ({
    guildBanner: {
        maxWidth: 1920,
        margin: 'auto',
        padding: `${theme.spacing(6)} 0`,
        minHeight: '35vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    guildBannerIs: {
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',

        '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            backgroundColor: alpha('#000', .7)
        }
    },
    guildBannerInner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
        transform: 'translateY(-10%)',
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
        animation: '1s ease .5s forwards $show',
        lineHeight: 1,
        marginTop: theme.spacing(3)
    },
    '@keyframes show': keyframes.show,
    '@keyframes move': keyframes.move
}));

const guildDetailsStyles = makeStyles( theme => ({
    detailsWrapper: {
        background: 'none',
        boxShadow: 'none',
        maxWidth: 1200,
        margin: `${theme.spacing(3)} auto`,
        opacity: 0,
        animation: '2s ease-out 1s forwards $show',
        display: 'flex',
        flexDirection: 'column',

        '&.Mui-expanded': {
            margin: `${theme.spacing(3)} auto`,

            '&:last-of-type': {
                marginBottom: theme.spacing(3),

            }
        },

        '&:before': {
            content: 'none'
        }
    },
    detailsHead: {
        minHeight: 'auto',
        fontSize: 15,
        display: 'inline-flex',
        margin: '0 auto',

        '&:hover': {
            textDecoration: 'underline'
        },

        '&.Mui-expanded': {
            minHeight: 'auto',
        },

        '& .MuiAccordionSummary-content': {
            flexGrow: 'unset',
            margin: '0 auto'
        }
    },
    detailsArrow: {
        fontSize: 24,
        marginLeft: theme.spacing(.5)
    },
    detailsBody: {
        backgroundColor: theme.palette.background.secondary,
        marginTop: theme.spacing(2),
        borderRadius: theme.spacing(1.5),
        padding: theme.spacing(2, 4)
    },
    detailsList: {
        listStyle: 'none',
        padding: 0
    },
    detailsItem: {

        '& + $detailsItem': {
            marginTop: theme.spacing(4)
        }
    },
    detailTitle: {
        textAlign: 'center',
        fontSize: 26,
        margin: 0,
        color: theme.palette.primary.main
    },
    detailBody: {
        marginTop: theme.spacing(1.5)
    },
    detailText: {
        fontSize: 16
    },
    '@keyframes show': keyframes.show
}));

const gotchisStyles = makeStyles( theme => ({
    guildGotchis: {
        background: theme.palette.background.secondary,
        paddingTop: theme.spacing(2),
        marginTop: theme.spacing(3),
        transform: 'translateY(50px)',
        opacity: 0,
        animation: '2s ease-out 1s forwards $show, 2s ease-out 1s forwards $move',
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
        padding: theme.spacing(2.5),
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
        paddingBottom: theme.spacing(2)
    },
    '@keyframes show': keyframes.show,
    '@keyframes move': keyframes.move
}));

export {
    styles as default,
    guildStyles,
    guildBanner,
    guildDetailsStyles,
    gotchisStyles
}