import { InfoStyles } from '../styles';

export default function CitadelInfo() {
    const classes = InfoStyles();

    return (
        <div className={classes.infoContainer}>
            <div className={classes.infoItem}>
                <span className={classes.infoButton}>shift</span> + <span className={classes.infoButton}>l click</span> = multiselect
            </div>
        </div>
    );
}
