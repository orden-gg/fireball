import { styles } from './style';

export function ContentWrapper({ children }: { children: JSX.Element[] }) {
    const classes = styles();

    return (
        <div className={classes.content}>
            <div className={classes.inner}>
                {children[0]}
            </div>

            <div className={classes.sidebar}>
                {children[1]}
            </div>
        </div>
    );
}
