import { gotchiFooterStyles } from './styles';

interface GotchiFooterProps {
    children: JSX.Element | JSX.Element[];
}

export function GotchiFooter({ children }: GotchiFooterProps) {
    const classes = gotchiFooterStyles();

    return <div className={classes.gotchiFooter}>
        {children}
    </div>;
}
