import { makeStyles } from "@mui/styles";

const styles = makeStyles( theme => ({
    wrapper: {
        width: 360,
        height: 360,
        position: 'relative',
        display: 'inline-block',
        '&.slideIn': {
            animation: '$slide-in 0.7s linear'
        },
        '&.slideOut': {
            animation: '$slide-out 0.7s linear'
        }
    },
    fly: {
        width: '100%',
        height: '100%',
        padding: 40,
        pointerEvents: 'none',
        animation: '$fly 3s linear infinite',
        '&.no-anim': {
            animationIterationCount: '1',
        }
    },
    ghost: {
        position: 'absolute',
        top: 30,
        left: 30,
        zIndex: 1,
        transformOrigin: 'center',
        width: 90,
        height: 125,
        transition: 'all 1.5s linear',
        transform: 'rotate(45deg)',
        '&.prepare-speach': {
            top: 100,
            left: 130,
            transform: 'rotate(0)',
        }
    },
    eyes: {
        position: 'absolute',
        zIndex: 1,
        width: 15,
        height: 15,
        top: 34,
        left: '50%',
        transform: 'translate(-50%)',
        borderRadius: 50,
        background: '#161616',
        marginLeft: -20,
        transformOrigin: 'center',
        boxShadow: '40px 0 0 #161616',
        '&.blink': {
            animation: '$blink 2s linear infinite',
            animationDelay: '1.5s',
        }
    },
    mouth: {
        position: 'absolute',
        zIndex: 1,
        width: 20,
        height: 15,
        left: '50%',
        background: '#161616',
        marginLeft: -10,
        top: 60,
        borderRadius: '20px 20px 12px 12px',
        transformOrigin: 'center bottom',
        overflow: 'hidden',
        transform: 'translate(0) scale(0.5)',
        '&.bla-bla': {
            animation: '$bla-bla 0.7s linear',
            animationFillMode: 'forwards',
            animationDelay: '1.5s',
        }
    },
    tail: {
        position: 'absolute',
        zIndex: -1,
        top: 82,
        height: 55,
        width: '100%',
        filter: 'url(#goo)',
        
        '&:before': {
          content: '""',
          background: '#fff',
          position: 'absolute',
          bottom: 35,
          left: 0,
          height: 100,
          width: '100%',
          borderRadius: '40px 40px 5px 5px'
        }
    },
    rip: {
        width: 15,
        height: 28,
        background: '#fff',
        position: 'absolute',
        top: 15,
        left: 0,
        boxShadow: '-62px 0 0 #fff, -31px 0 0 #fff, 31px 0 0 #fff, 62px 0 0 #fff, 93px 0 0 #fff',
        borderRadius: '50%',
        animation: '$ghost-rips 1.2s linear infinite'
    },
    tooltip: {
        position: 'absolute',
        top: 55,
        right: 60,
        whiteSpace: 'nowrap',
        backgroundColor: theme.palette.secondary.dark,
        padding: '2px 8px',
        borderRadius: 4,
        zIndex: 2,
        opacity: 0,
        transform: 'skewX(-60deg) rotateX(-90deg)',
        animation: '$bubble .5s linear',
        animationDelay: '1.5s',
        animationFillMode: 'forwards',
    },
    '@keyframes fly': {
        '0%': {
            transform: 'rotate(0)',
        },
        '100%': {
            transform: 'rotate(360deg)',
        },
    },
    '@keyframes bubble': {
        'to': {
            right: 70,
            opacity: 1,
            transform: 'skewX(0) rotate(0)',
        },
    },
    '@keyframes blink': {
        '0%': {
            transform: 'translateX(-50%) scale(1)',
        },
        '35%': {
            transform: 'translateX(-50%) scale(1)',
        },
        '48%': {
            transform: 'translateX(-50%) scale(1, 0.4)',
        },
        '52%': {
            transform: 'translateX(-50%) scale(1, 0.4)',
        },
        '65%': {
            transform: 'translateX(-50%) scale(1)',
        },
        '100%': {
            transform: 'translateX(-50%) scale(1)',
        },
    },
    '@keyframes bla-bla': {
        '0%': {
            transform: 'translate(0) scale(0.5)',
        },
        '25%': {
            transform: 'translate(0) scale(0.8)',
        },
        '50%': {
            transform: 'translate(0) scale(0.5)',
        },
        '75%': {
            transform: 'translate(0) scale(0.8)',
            width: 20,
            height: 15,
            marginLeft: -10,
            top: 60,
        },
        '100%': {
            transform: 'translate(0) scale(0.4)',
            width: 36,
            height: 10,
            marginLeft: -18,
            top: 63,
        }
    },
    '@keyframes ghost-rips': {
        '0%': {
            left: 0,
            top: 12
        },
        '50%': {
            left: 31,
            top: 20
        },
        '100%': {
            left: 62,
            top: 12
        }
    },
    '@keyframes slide-in': {
        '0%': {
            opacity: 0
        },
        '100%': {
            opacity: 1
        }
    },
    '@keyframes slide-out': {
        '0%': {
            opacity: 1
        },
        '100%': {
            opacity: 0
        }
    }
}));

export default styles