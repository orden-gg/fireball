import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles((theme) =>
    createStyles({
        fakeLoader: {
            width: 60,
            height: 100,
            '& .layer-2, & .layer-3, & .layer-4, & .layer-5': {
                opacity: 0
            },
            '& .layer-1': {
                animation: '$fly 2s linear infinite alternate'
            },
            '& .layer-2': {
                animation: '$fly-layer 2s linear infinite alternate',
                animationDelay: '0.4s'
            },
            '& .layer-3': {
                animation: '$fly-layer 2s linear infinite alternate',
                animationDelay: '0.6s'
            },
            '& .layer-4': {
                animation: '$fly-layer 2s linear infinite alternate',
                animationDelay: '0.8s'
            },
            '& .layer-5': {
                animation: '$fly-layer 2s linear infinite alternate',
                animationDelay: '1s'
            },
            '& .eyes': {
                fill: theme.palette.rarity.godlike,
                animation: '$blink 2s linear infinite alternate'
            }
        },
        '@keyframes fly': {
            '50%': {
                opacity: 1,
                transform: 'translateY(-5px)'
            }
        },
        '@keyframes fly-layer': {
            '50%': {
                opacity: 0.75,
                transform: 'translateY(-5px)'
            }
        },
        '@keyframes blink': {
            '0%': {
                fill: theme.palette.rarity.godlike
            },
            '20%': {
                fill: theme.palette.rarity.uncommon
            },
            '40%': {
                fill: theme.palette.rarity.rare
            },
            '50%': {
                opacity: 1,
                transform: 'translateY(-5px)'
            },
            '60%': {
                fill: theme.palette.rarity.legendary
            },
            '80%': {
                fill: theme.palette.rarity.mythical
            },
            '100%': {
                fill: theme.palette.rarity.godlike
            }
        }
    })
);
