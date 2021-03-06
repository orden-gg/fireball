import { Box, Typography } from '@mui/material';

import { styles } from './styles';

interface SubtitleProps {
    children: JSX.Element | string;
    variant: any;
}

export function Subtitle({ children, variant }: SubtitleProps) {
    const classes = styles();

    return (
        <Box
            className={classes.subtitle}
        >
            <Typography
                className={classes.subtitleText}
                variant={variant ? variant : 'h6'}
            >
                <span>{children}</span>
            </Typography>
        </Box>
    );
}
