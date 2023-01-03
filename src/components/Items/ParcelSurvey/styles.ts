import { alpha, darken } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const parcelSurveyStyles = makeStyles((theme) =>
    createStyles({
        surveyList: {
            marginTop: theme.spacing(1.5),
            position: 'relative',
            fontSize: 12
        },
        rateAvarage: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '100%',
            textAlign: 'center',
            color: theme.palette.rarity.golden,
            fontWeight: 700
        },
        surveyAlchemica: {
            height: 5,
            transition: 'height .3s',
            position: 'relative',
            '&:after': {
                content: '""',
                position: 'absolute',
                left: '50%',
                top: 1,
                bottom: 1,
                marginLeft: -1,
                width: 2,
                backgroundColor: alpha('#000', .5)
            },
            '.parcel:hover &, .active &': {
                height: 12
            }
        },
        fud: {
            backgroundColor: alpha(darken(theme.palette.alchemica.fud, 0.5), 0.8),
            color: theme.palette.alchemica.fud
        },
        fomo: {
            backgroundColor: alpha(darken(theme.palette.alchemica.fomo, 0.5), 0.8),
            color: theme.palette.alchemica.fomo
        },
        alpha: {
            backgroundColor: alpha(darken(theme.palette.alchemica.alpha, 0.5), 0.8),
            color: theme.palette.alchemica.alpha
        },
        kek: {
            backgroundColor: alpha(darken(theme.palette.alchemica.kek, 0.5), 0.8),
            color: theme.palette.alchemica.kek
        },
        surveyAlchemicaBar: {
            height: '100%',
            width: '80%',
            position: 'relative',
            textAlign: 'center',
            '&:before': {
                content: '""',
                position: 'absolute',
                backgroundColor: 'currentColor',
                opacity: 0.8,
                height: '100%',
                width: '100%',
                left: 0
            }
        },
        amount: {
            position: 'relative',
            zIndex: 1,
            opacity: 0,
            color: theme.palette.common.white,
            transition: 'opacity .1s 0s',
            lineHeight: 1,
            display: 'block',
            fontWeight: 700,
            fontStyle: 'italic',
            textShadow: '0 0 1px #000, 0 0 1px #000, 0 0 1px #000',
            padding: theme.spacing(0, 1),
            '.parcel:hover &, .active &': {
                opacity: 1,
                transition: 'opacity .3s .1s'
            }
        }
    })
);
