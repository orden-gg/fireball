import { useTheme } from '@mui/material';
import { alpha } from '@mui/system';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(() => ({
    box: {
        padding: 2,
        border: '3px solid transparent',
        backgroundColor: '#7257FF'
    }
}));

export default function HighlightNumber({ children, type }) {
    const classes = styles();
    const theme = useTheme();

    const getColor = (type) => {
        return theme.palette.rarity[type] || 'transparent';
    };

    return (
        <div
            className={classes.box}
            style={{
                backgroundColor: getColor(type) === 'transparent' ? '#7257FF' : alpha(getColor(type), .8),
                color: getColor(type) === '#7257FF' ? theme.palette.text.primary : theme.palette.secondary.main
            }}
        >
            {children}
        </div>
    );
}
