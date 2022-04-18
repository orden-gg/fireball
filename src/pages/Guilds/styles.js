import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

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

const styles = makeStyles(theme => ({
    guildsWrapper: {
        position: 'relative',
        maxWidth: 1920,
        padding: theme.spacing(2),
        margin: 'auto',
        textAlign: 'right',
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1.5)
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1)
        }
    },
    guildsTitle: {
        display: 'inline-flex',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 18,
        color: theme.palette.primary.main,
        marginTop: 20,
        paddingRight: 20,
        textDecoration: 'none',
        '& span': {
            marginRight: 4,
        },
        '&:hover': {
            color: theme.palette.primary.dark,
        },
    },
    guildsList: {
        padding: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px,1fr))',
        gridGap: theme.spacing(3),
        marginTop: theme.spacing(4),
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))',
            gridGap: theme.spacing(2)
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))',
            gridGap: theme.spacing(1)
        }
    },
    guildButton: {
        color: theme.palette.text.primary,
        width: '100%',
        cursor: 'pointer',
        background: 'none',
        padding: theme.spacing(0),
        border: `2px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.palette.secondary.dark,
        '&:disabled': {
            opacity: .3,
            cursor: 'default'
        }
    },
    guildBody: {
        flex: '1 1 auto',
        textAlign: 'left',
        padding: theme.spacing(2),
        position: 'relative',
        zIndex: 1,
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1)
        },
    },
    guildName: {
        fontWeight: 700,
        transition: 'color .2s linear',
        fontSize: 18,
        lineHeight: 1.2,
        margin: 0,
        [theme.breakpoints.down('md')]: {
            fontSize: 14,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 12
        }
    },
    guildLogo: {
        maxWidth: '30%',
        minWidth: '30%',
        minHeight: '100%',
        position: 'relative',
        paddingBottom: '30%',
        backgroundColor: '#000',
        zIndex: 1
    },
    guildLogoImage: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '80%',
        maxHeight: '80%',
        '&.placeholder': {
            color: alpha(theme.palette.secondary.dark, .7)
        }
    },
    guildInfoList: {
        listStyle: 'none',
        padding: 0,
        textTransform: 'none',
        marginTop: theme.spacing(1),
        display: 'flex',
        flexWrap: 'wrap'
    },
    guildInfoItem: {
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            marginRight: theme.spacing(1)
        },
    },
    guildInfoItemIcon: {
        width: 20,
        maxWidth: 20,
        maxHeight: 20,
        [theme.breakpoints.down('md')]: {
            width: 18,
            maxWidth: 18,
            maxHeight: 18
        }
    },
    guildInfoAmountLoader: {
        minWidth: 30,
        [theme.breakpoints.down('md')]: {
            minWidth: 20
        }
    },
    guildInfoAmount: {
        display: 'inline-block',
        marginLeft: theme.spacing(1),
        [theme.breakpoints.down('md')]: {
            fontSize: 12,
            marginLeft: theme.spacing(.5)
        }
    },
    guildWearables: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    guildWearable: {
        width: 22,
        height: 15,
        margin: theme.spacing(1.5, 1, .5, 0)
    }
}));

const guildWearables = makeStyles(theme => ({
    guildWearable: {
        minHeight: 'auto',
        position: 'relative',
        '& img': {
            maxHeight: '120%',
            width: '100%',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }
    }
}));

const guildStyles = makeStyles(theme => ({
    guildWrapper: {
        position: 'relative',
        display: 'flex',
        minHeight: 'calc(100vh - 140px)',
        backgroundColor: theme.palette.background.secondary,
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    guildSidebar: {
        flexBasis: '25%',
        minWidth: 180,
        position: 'relative',
        backgroundColor: theme.palette.background.default,
        boxShadow: `5px 0 5px 0 ${theme.palette.secondary.dark}`,
        paddingBottom: theme.spacing(4),
        zIndex: 3,
        [theme.breakpoints.down('md')]: {
            maxWidth: '30%'
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: 'none',
            paddingBottom: 0
        }
    },
    guildContent: {
        flexGrow: '1',
        display: 'flex',
        flexDirection: 'column'
    },
    backButton: {
        position: 'absolute',
        left: '100%',
        top: theme.spacing(2.4),
        marginLeft: theme.spacing(1),
        zIndex: 4,
        [theme.breakpoints.down('md')]: {
            width: 25,
            height: 25
        },
        [theme.breakpoints.down('sm')]: {
            left: theme.spacing(1),
            top: theme.spacing(1),
        },
        '& .MuiSvgIcon-root': {
            fontSize: 30,
            transition: 'translate .2s ease',
            [theme.breakpoints.down('md')]: {
                fontSize: 20
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: 24
            }
        },
        '&:hover': {
            color: theme.palette.primary.main
        }
    }
}));

const guildBanner = makeStyles(theme => ({
    guildBanner: {
        minHeight: '30%',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            position: 'relative'
        }
    },
    guildBannerBg: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
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
        padding: theme.spacing(2, 3),
        position: 'relative',
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            paddingBottom: theme.spacing(1),
            position: 'static',
            padding: theme.spacing(2, 1)
        }
    },
    guildBannerTop: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    guildBannerText: {
        fontSize: 14
    },
    guildLogo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translateY(-10%)',
        opacity: 0,
        animation: '2s ease-out .2s forwards $show, 2s ease-out .2s forwards $move',
    },
    guildLogoImage: {
        maxHeight: 85,
        '&.placeholder': {
            color: theme.palette.secondary.dark
        }
    },
    guildName: {
        textAlign: 'center',
        color: theme.palette.primary.main,
        fontSize: 24,
        opacity: 0,
        animation: '1s ease .5s forwards $show',
        lineHeight: 1.2,
        marginTop: theme.spacing(1),
        [theme.breakpoints.down('md')]: {
            fontSize: 18
        }
    },
    buttonPrev: {
        position: 'absolute',
        top: '50%',
        left: theme.spacing(1),
        transform: 'translateY(-50%) scaleX(-1)',
        [theme.breakpoints.down('md')]: {
            width: 24,
            height: 24,
            '& .MuiSvgIcon-root': {
                fontSize: 16
            }
        }
    },
    buttonNext: {
        position: 'absolute',
        top: '50%',
        right: theme.spacing(1),
        transform: 'translateY(-50%)',
        [theme.breakpoints.down('md')]: {
            width: 24,
            height: 24,
            '& .MuiSvgIcon-root': {
                fontSize: 16
            }
        }
    },
    '@keyframes show': keyframes.show,
    '@keyframes move': keyframes.move
}));

const guildSocialsStyles = makeStyles(theme => ({
    guildSocials: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 10,
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            position: 'static'
        }
    },
    guildSocialButton: {
        margin: theme.spacing(0, 1),
        [theme.breakpoints.down('md')]: {
            width: 30,
            height: 30,
            padding: 5,
            margin: theme.spacing(0, .5)
        },
        '&:hover': {
            color: theme.palette.primary.main
        }
    },
    guildSocialIcon: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 20
        }
    }
}));

const guildDetailsStyles = makeStyles(theme => ({
    detailsButton: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
            padding: '2px 5px'
        }
    },
    detailsWrapper: {
        margin: theme.spacing(3, 0),
        opacity: 0,
        animation: '2s ease-out 1s forwards $show',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            margin: theme.spacing(2, 0)
        },
        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            right: 10,
            top: 10,
            margin: 0
        }
    },
    detailsModal: {
        width: 800
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
    guildWearables: {
        display: 'flex',
        justifyContent: 'center'
    },
    guildWearable: {
        width: 30,
        height: 20,
        margin: theme.spacing(1)
    },
    '@keyframes show': keyframes.show
}));

const guildContentStyles = makeStyles(theme => ({
    guildGotchis: {
        height: '100%',
        paddingLeft: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            height: '80vh',
            paddingRight: theme.spacing(2)
        }
    },
    memberName: {
        textAlign: 'center'
    },
    memberGotchis: {
        gap: theme.spacing(2),
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        display: 'grid',
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
        height: '100%',
        position: 'relative',
        maxWidth: '100%',
        margin: theme.spacing(0, 2),
        zIndex: 2,
        '& .citadel-interface': {
            top: 30
        },
        [theme.breakpoints.down('sm')]: {
            paddingBottom: '60%',
            margin: 0,
            '& .citadel-interface': {
                top: 10,
                right: 5
            }
        }
    }
}));

const guildNavStyles = makeStyles(theme => ({
    guildNav: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 2,
        alignSelf: 'center',
        padding: theme.spacing(2, 0, 1.5),
        margin: 0,
        width: '100%',
        boxShadow: `0 10px 8px ${theme.palette.background.secondary}`,
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1, 0, .7)
        }
    }
}));

export {
    styles as default,
    guildStyles,
    guildBanner,
    guildDetailsStyles,
    guildContentStyles,
    guildNavStyles,
    guildSocialsStyles,
    guildWearables
}
