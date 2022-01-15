
import { alpha } from "@mui/material";
import { makeStyles } from "@mui/styles";

import mapSvg from '../../assets/images/svgs/map.svg';
import listSvg from '../../assets/images/svgs/list.svg';

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
        margin: 'auto',

        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1.5)
        },

        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1)
        }
    },
    guildsTitle: {
        textAlign: 'center',
        fontSize: 36,
        marginTop: theme.spacing(6),

        [theme.breakpoints.down('md')]: {
            fontSize: 28,
            marginTop: theme.spacing(3)
        },

        [theme.breakpoints.down('sm')]: {
            fontSize: 24,
        }
    },
    guildsList: {
        padding: 0,
        display: "grid",
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))',
        gridGap: theme.spacing(7, 3),
        marginTop: theme.spacing(7),

        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px,1fr))',
            gridGap: theme.spacing(4, 2),
            marginTop: theme.spacing(4),
        },

        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: 'repeat(auto-fill, minmax(164px,1fr))',
        }
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
        margin: theme.spacing(2, 0, 0),

        [theme.breakpoints.down('md')]: {
            fontSize: 22,
            marginTop: theme.spacing(1.5)
        },

        [theme.breakpoints.down('sm')]: {
            fontSize: 18
        }
    },
    guildLogo: {
        width: '80%',
        margin: 'auto',
        position: 'relative',
        paddingBottom: '50%',
        transition: 'transform .2s ease-out',

        [theme.breakpoints.down('sm')]: {
            width: '90%'
        }
    },
    guildLogoImage: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '100%',
        maxHeight: '100%',

        '&.placeholder': {
            color: alpha(theme.palette.secondary.dark, .7)
        }
    }

}));

const guildStyles = makeStyles( theme => ({

    guildWrapper: {
        position: 'relative'
    },
    backButton: {
        position: 'absolute',
        left: theme.spacing(3),
        top: theme.spacing(2),
        zIndex: 1,

        [theme.breakpoints.down('md')]: {
            left: theme.spacing(2),
            top: theme.spacing(1),
        },

        [theme.breakpoints.down('sm')]: {
            left: theme.spacing(1),
            top: theme.spacing(.5),
        },
        
        '& .MuiSvgIcon-root': {
            fontSize: 30,
            transition: 'translate .2s ease',

            [theme.breakpoints.down('sm')]: {
                fontSize: 24
            }
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
        animation: '3s ease infinite $bounce',

        [theme.breakpoints.down('md')]: {
            width: 120
        }
    },
    backdropImage: {
        width: '100%',
        transition: '.5s linear',
        willChange: 'transform, opacity',
        color: theme.palette.secondary.dark,

        '&.out': {
            opacity: 0,
            transform: 'scale(2)'
        },
    },
    guildContent: {
        background: theme.palette.background.secondary,
        paddingTop: theme.spacing(2),
        marginTop: theme.spacing(3),
        willChange: 'transform',
        transform: 'translateY(50px)',
        opacity: 0,
        animation: '2s ease-out 1s forwards $show, 2s ease-out 1s forwards $move',

        [theme.breakpoints.down('md')]: {
            marginTop: theme.spacing(2),
        }
    },
    '@keyframes show': keyframes.show,
    '@keyframes move': keyframes.move,
    '@keyframes bounce': keyframes.bounce
}));

const guildBanner = makeStyles( theme => ({
    guildBanner: {
        margin: 'auto',
        padding: theme.spacing(6, 1, 5),
        minHeight: '35vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(3, 1, 2.5)
        }
    },
    guildBannerIs: {
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',

        '&:before': {
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
        maxWidth: 1200,
        margin: 'auto',
        width: '100%'
    },
    guildBannerTop: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    guildBannerText: {
        fontSize: 28,
        flexGrow: 1,
        width: '100%',

        [theme.breakpoints.down('md')]: {
            fontSize: 20
        },

        [theme.breakpoints.down('sm')]: {
            fontSize: 14
        }
    },
    guildLogo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.spacing(0, 6),
        minWidth: 300,
        transform: 'translateY(-10%)',
        opacity: 0,
        animation: '2s ease-out .2s forwards $show, 2s ease-out .2s forwards $move',

        [theme.breakpoints.down('md')]: {
            minWidth: 200,
            margin: theme.spacing(0, 3),
        },

        [theme.breakpoints.down('sm')]: {
            minWidth: 110,
            margin: theme.spacing(0, 1)
        }
    },
    guildLogoImage: {
        maxHeight: 200,

        [theme.breakpoints.down('md')]: {
            maxHeight: 150
        },

        [theme.breakpoints.down('md')]: {
            maxHeight: 95
        },
        
        '&.placeholder': {
            color: theme.palette.secondary.dark
        }
    },
    guildMembers: {
        textAlign: 'right',
        transform: 'translateX(-50px)',
        opacity: 0,
        animation: '2s ease-out .2s forwards $show, 2s ease-out .2s forwards $move',

        '& span': {
            color: theme.palette.primary.main,
            marginLeft: theme.spacing(2),

            [theme.breakpoints.down('md')]: {
                marginLeft: theme.spacing(1)
            }
        }
    },
    guildGotchis: {
        transform: 'translateX(50px)',
        opacity: 0,
        animation: '2s ease-out .2s forwards $show, 2s ease-out .2s forwards $move',

        '& span': {
            color: theme.palette.primary.main,
            marginRight: theme.spacing(2),

            [theme.breakpoints.down('md')]: {
                marginRight: theme.spacing(1)
            }
        }
    },
    guildName: {
        textAlign: 'center',
        color: theme.palette.primary.main,
        fontSize: 50,
        opacity: 0,
        animation: '1s ease .5s forwards $show',
        lineHeight: 1.2,
        marginTop: theme.spacing(3),
        padding: theme.spacing(0, 2),

        [theme.breakpoints.down('md')]: {
            fontSize: 32,
            marginTop: theme.spacing(1)
        },

        [theme.breakpoints.down('sm')]: {
            fontSize: 24
        },
    },
    guildSocials: {
        position: 'absolute',
        right: theme.spacing(4),
        top: theme.spacing(2.5),

        [theme.breakpoints.down('md')]: {
            right: theme.spacing(2.5),
            top: theme.spacing(1.5)
        },

        [theme.breakpoints.down('sm')]: {
            right: theme.spacing(1.5),
            top: theme.spacing(1)
        }
    },
    guildSocialButton: {
        marginLeft: theme.spacing(1),

        [theme.breakpoints.down('sm')]: {
            width: 30,
            height: 30,
            padding: 5,
            marginLeft: theme.spacing(1)
        },

        '&:hover': {
            color: theme.palette.primary.main
        }
    },
    guildSocialIcon: {

        [theme.breakpoints.down('sm')]: {
            fontSize: 20
        }
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

        [theme.breakpoints.down('md')]: {
            margin: `${theme.spacing(2)} auto`,
        },

        '&.Mui-expanded': {
            margin: `${theme.spacing(3)} auto`,

            [theme.breakpoints.down('md')]: {
                margin: `${theme.spacing(2)} auto`,
            },

            '&:last-of-type': {
                marginBottom: theme.spacing(3),

                [theme.breakpoints.down('md')]: {
                    marginBottom: theme.spacing(2)
                },

            }
        },

        '&:before': {
            content: 'none'
        },

        '& .MuiCollapse-root': {
            padding: theme.spacing(0, 2),

            [theme.breakpoints.down('md')]: {
                padding: theme.spacing(0, 1.5)
            },
    
            [theme.breakpoints.down('sm')]: {
                padding: theme.spacing(0, 1)
            }
        }
    },
    detailsHead: {
        minHeight: 'auto',
        fontSize: 15,
        display: 'inline-flex',
        margin: '0 auto',
        position: 'relative',

        [theme.breakpoints.down('md')]: {
            fontSize: 13
        },

        [theme.breakpoints.down('sm')]: {
            fontSize: 12
        },

        '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            right: '50%',
            height: 1,
            backgroundColor: theme.palette.text.primary,
            transition: '.1s linear'
        },

        '&:hover:after': {
            left: theme.spacing(2),
            right: theme.spacing(2),
        },

        '&.Mui-expanded': {
            minHeight: 'auto',
        },

        '& .MuiAccordionSummary-content': {
            margin: `0 ${theme.spacing(1)} 0 0`
        }
    },
    detailsArrow: {
        fontSize: 24,
        margin: '0 -6px',

        [theme.breakpoints.down('md')]: {
            fontSize: 22,
            margin: '0 -5px',
        },

        [theme.breakpoints.down('sm')]: {
            fontSize: 18,
            margin: '0 -4px',
        }
    },
    detailsBody: {
        backgroundColor: theme.palette.background.secondary,
        marginTop: theme.spacing(3),
        borderRadius: theme.spacing(1.5),
        padding: theme.spacing(4, 6),

        [theme.breakpoints.down('md')]: {
            marginTop: theme.spacing(2),
            borderRadius: theme.spacing(1),
            padding: theme.spacing(3)
        },

        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2)
        }
    },
    detailsList: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    detailsItem: {

        '& + $detailsItem': {
            marginTop: theme.spacing(4),

            [theme.breakpoints.down('md')]: {
                marginTop: theme.spacing(3)
            }
        }
    },
    detailTitle: {
        textAlign: 'center',
        fontSize: 26,
        margin: 0,
        color: theme.palette.primary.main,

        [theme.breakpoints.down('md')]: {
            fontSize: 22
        },

        [theme.breakpoints.down('sm')]: {
            fontSize: 18
        }
    },
    detailBody: {
        marginTop: theme.spacing(1.5),

        [theme.breakpoints.down('md')]: {
            marginTop: theme.spacing(1)
        },

        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(.5)
        }
    },
    detailText: {
        fontSize: 16,
        textAlign: 'center',

        [theme.breakpoints.down('md')]: {
            fontSize: 14
        }
    },
    '@keyframes show': keyframes.show
}));

const guildContentStyles = makeStyles( theme => ({
    guildGotchis: {
        padding: theme.spacing(2),
        maxWidth: 1920,
        margin: 'auto',
        gap: theme.spacing(2),
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        display: 'grid',
    },
    guildRealm: {
        display: 'grid',
        alignItems: 'start',
        gap: theme.spacing(2),
        padding: theme.spacing(2),
        gridTemplateColumns: 'repeat(auto-fill, minmax(192px, 1fr))',
        gridAutoRows: '1fr',
    },
    guildRealmItem: {
        height: '100%'
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
    guildCitadel: {
        height: 600,
        margin: 20,
        position: 'relative'
    }
}));

const guildNavStyles = makeStyles( theme => ({
    container: {
        margin: theme.spacing(1, 0),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 1,
        alignSelf: 'center'
    },
    navItem: {
        margin: 4,
        position: 'relative'
    },
    button: {
        paddingRight: 12,
        paddingLeft: 12,
        color: '#fff',
        border: `2px solid ${alpha(theme.palette.primary.main, .2)}`,
        backgroundColor: alpha(theme.palette.secondary.dark, .4),
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
        '&.Mui-disabled': {
            backgroundColor: alpha(theme.palette.secondary.dark, .2),
            borderColor: alpha(theme.palette.secondary.light, .2),
            color: alpha('#fff', .3)
        },
        '&.active, &.active:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            '&.Mui-disabled': {
                backgroundColor: alpha(theme.palette.primary.main, .1),
                color: alpha('#fff', .2),
            },
        }
    },
    label: {
        fontSize: 14,
        fontWeight: 600,
        color: theme.palette.primary.main,
        marginLeft: 8,

        '.Mui-disabled &': {
            opacity: .4
        },

        '.active &, .active:hover &': {
            color: theme.palette.secondary.main
        },

        'Mui-disabled.active &, Mui-disabled.active:hover &': {
            color: theme.palette.primary.main
        }
    },
    buttonLoader: {
        width: 28,
        height: 14,
        marginLeft: 8
    },
    
    realmViewSwitch: {
        position: 'absolute',
        left: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        visibility: 'hidden',
        opacity: 0,
        transition: '.5s ease-in-out',
        width: 62,
        height: 34,
        padding: 7,
        willChange: 'opacity, transform',

        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url(${mapSvg})`,
                }
            },
        },
        '& .MuiSwitch-thumb': {
            width: 32,
            height: 32,
            '&:before': {
                content: "''",
                position: 'absolute',
                width: '80%',
                height: '80%',
                left: '10%',
                top: '10%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${listSvg})`,
            },
        },
        '& .MuiSwitch-track': {
            borderRadius: 20 / 2
        },
        '& .Mui-checked+.MuiSwitch-track': {
            // opacity: 1,
            backgroundColor: '#fff'
        },

        '.active + &': {
            marginLeft: theme.spacing(2),
            opacity: 1,
            visibility: 'visible'
        }
    }
}));

export {
    styles as default,
    guildStyles,
    guildBanner,
    guildDetailsStyles,
    guildContentStyles,
    guildNavStyles
}