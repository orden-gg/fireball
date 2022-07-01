import { styles } from './styles';

export function NotFound() {
    const classes = styles();

    return (
        <div className={classes.container}>Page not found</div>
    );
}
