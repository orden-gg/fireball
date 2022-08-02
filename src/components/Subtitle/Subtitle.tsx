import { Box, Typography } from '@mui/material';

import classNames from 'classnames';

import { styles } from './styles';

interface SubtitleProps {
    children: JSX.Element | string;
    variant: any;
    innerBg?: string;
    className?: string;
}

export function Subtitle({ children, variant, innerBg, className }: SubtitleProps) {
    const classes = styles();

    return (
        <Box
            className={classNames(classes.subtitle, className)}
        >
            <div className={classes.subtitleInner}>
                <Typography
                    className={classes.subtitleText}
                    bgcolor={innerBg ? innerBg : 'background.default'}
                    variant={variant ? variant : 'h6'}
                >
                {children}
                </Typography>
            </div>
        </Box>
    );
}
