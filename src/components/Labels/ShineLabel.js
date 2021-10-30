import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    labelWrapper: {
        color: theme.palette.rarity.legendary,
        fontSize: '15px',
        fontStyle: 'italic',
        fontWeight: 600,
        textShadow: `${theme.palette.secondary.dark} 2px 2px 0px,
                    ${theme.palette.secondary.main} -1px -1px 0px,
                    ${theme.palette.secondary.main} 1px -1px 0px,
                    ${theme.palette.secondary.main} -1px 1px 0px,
                    ${theme.palette.secondary.main} 1px 1px 0px`
    },
    label: {
        animation: '$shine 1s linear infinite alternate'
    },
    '@keyframes shine': {
        '0%': {
            color: theme.palette.rarity.legendary
        },
        '70%': {
            color: theme.palette.rarity.legendary
        },
        '100%': {
            color: '#ffffff'
        }
    },
}));

export default function ShineLabel({text}) {
    const classes = useStyles();

    return (
        <div className={classes.labelWrapper}>
            {text.split('').map((c, i) => (
                <span className={classes.label} key={i} style={{ animationDelay: `${-i * 0.04}s` }}>
                    {c === ' ' ? <>&nbsp;</> : c}
                </span>
            ))}
        </div>
    );
}