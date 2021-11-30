import React from 'react';
import { useTheme } from '@mui/material';

import { alpha } from '@mui/system';
import useClasses from '../hooks/useClasses';

const styles = theme => ({
    box: {
        padding: 2,
        border: '3px solid transparent'
    }
});

export default function HighlightNumber({children, type}) {
    const classes = useClasses(styles);
    const theme = useTheme();

    const getColor = (type) => {
        switch (type) {
            case 'common':
                return theme.palette.rarity.common;
            case 'uncommon':
                return theme.palette.rarity.uncommon;
            case 'rare':
                return theme.palette.rarity.rare;
            case 'legendary':
                return theme.palette.rarity.legendary;
            case 'mythical':
                return theme.palette.rarity.mythical;
            case 'godlike':
                return theme.palette.rarity.godlike;
            default:
                return 'transparent';
        }
    };

    return (
        <div
            className={classes.box}
            style={{
                backgroundColor: getColor(type) === 'transparent' ? 'transparent' : alpha(getColor(type), .8),
                borderColor: getColor(type) === 'transparent' ? 'transparent' : alpha(theme.palette.secondary.dark, .5),
                color: getColor(type) === 'transparent' ? theme.palette.text.primary : theme.palette.secondary.main
            }}
        >
            {children}
        </div>
    );
}