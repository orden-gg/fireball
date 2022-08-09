import { styled, Tooltip, tooltipClasses } from '@mui/material';

interface CustomTooltipProps {
    children: JSX.Element;
    title: string | JSX.Element;
    placement:
        | 'bottom-end'
        | 'bottom-start'
        | 'bottom'
        | 'left-end'
        | 'left-start'
        | 'left'
        | 'right-end'
        | 'right-start'
        | 'right'
        | 'top-end'
        | 'top-start'
        | 'top';
    followCursor?: boolean;
    enterTouchDelay?: number;
    className?: string;
    arrow?: boolean;
    open?: boolean;
}

const StyledTooltip = styled(({ className, ...props }: CustomTooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.secondary.dark
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.secondary.dark,
        '& p': {
            margin: 0

        },
        '& .highlight': {
            color: theme.palette.primary.main
        }
    }
}));

export function CustomTooltip(props: CustomTooltipProps) {
    return (
        <StyledTooltip {...props}>
            {props.children}
        </StyledTooltip>
    );
}
