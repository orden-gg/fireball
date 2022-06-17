import { Box, Typography } from '@mui/material';

import { styles } from './styles';

interface SubtitleProps {
    children: JSX.Element | string;
    margin: string;
    variant: any;
    innerBg: string;
}

export function Subtitle({ children, margin, variant, innerBg }: SubtitleProps) {
    const classes = styles();

    return (
        <Box
            className={classes.subtitle}
            margin={margin ? margin : 0}
        >
            <Box className={classes.subtitleInner}>
                <Typography
                    className={classes.subtitleText}
                    bgcolor={innerBg ? innerBg : 'background.default'}
                    variant={variant ? variant : 'h6'}
                >
                    {children}
                </Typography>
            </Box>
        </Box>
    );
}
