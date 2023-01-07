import { alpha, darken } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const parcelSurveyStyles = makeStyles((theme) =>
    createStyles({
        surveyList: {
            marginTop: theme.spacing(1.5),
            fontSize: 5,
            position: 'relative',
            zIndex: 4,
            '.parcel:hover &': {
                fontSize: 12
            }
        },
        surveyListHead: {
            display: 'flex',
            justifyContent: 'space-between',
            position: 'absolute',
            right: 0,
            left: 0,
            bottom: '100%',
            textAlign: 'center',
            color: theme.palette.rarity.golden,
            textShadow: '0 0 1px #000, 0 0 1px #000, 0 0 1px #000',
            fontWeight: 700,
            fontStyle: 'italic',
            fontSize: 12
        },
        surveyedTime: {
            padding: theme.spacing(0, 1)
        },
        rateAvarage: {
            padding: theme.spacing(0, 1)
        },
        surveyAlchemica: {
            transition: 'font-size .2s',
            position: 'relative',
            lineHeight: 1
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
            width: '100%',
            position: 'relative',
            textAlign: 'center',
            '&:before': {
                content: '""',
                position: 'absolute',
                backgroundColor: 'currentColor',
                opacity: 0.5,
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
            display: 'block',
            fontWeight: 700,
            fontStyle: 'italic',
            textShadow: '0 0 1px #000, 0 0 1px #000, 0 0 1px #000',
            padding: theme.spacing(0, 1),
            '.parcel:hover &, .active &': {
                opacity: 1,
                transition: 'opacity .3s .1s'
            }
        },
        supplyRate: {
            position: 'absolute',
            right: 0,
            padding: theme.spacing(0, 1),
            top: 0,
            zIndex: 1,
            fontWeight: 700,
            fontStyle: 'italic',
            transition: 'opacity .1s 0s',
            opacity: 0,
            textShadow: '0 0 1px #000, 0 0 1px #000, 0 0 1px #000',
            backgroundImage: `linear-gradient(to right, transparent 0%, ${alpha('#000', .5)} 100%)`,
            '.parcel:hover &, .active &': {
                opacity: 1,
                transition: 'opacity .3s .1s'
            }
        }
    })
);
