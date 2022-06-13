import { styles } from './style';

export function ContentWrapper({ children }: { children: JSX.Element[] }) {
    const classes = styles();

    return (
        <div className={classes.content}>
            <div className={classes.sidebar}>
                {children[0]}
            </div>

            <div className={classes.inner}>
                {children[1]}
            </div>
        </div>
    );
}
