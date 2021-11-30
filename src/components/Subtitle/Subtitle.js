import React from 'react';
import { Box, Typography } from '@mui/material';


import styles from './styles';

export default function Subtitle({children, margin, variant, innerBg}) {
    const classes = styles();

    return (
        <Box className={classes.subtitle} margin={margin ? margin : 0}>
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
    )
}