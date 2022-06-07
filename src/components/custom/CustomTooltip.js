import { styled, Tooltip, tooltipClasses } from '@mui/material';

const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.secondary.dark,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.secondary.dark,
        '& p': {
            margin: 0,

        },
        '& .highlight': {
            color: theme.palette.primary.main
        }
    },
}));

export default function CustomTooltip({ children, ...props }) {
    return (
        <StyledTooltip {...props}>
            {children}
        </StyledTooltip>
    );
}
