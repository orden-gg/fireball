import installationsUtils from 'utils/installationsUtils';

import styles from './styles';

export default function InstallationImage({ data }) {
    const classes = styles();
    const name = installationsUtils.getNameById(data.id);
    const src = installationsUtils.getImageById(data.id);

    return (
        <div className={classes.installationImageBox}>
            <img
                src={src}
                alt={name}
                className={classes.installationImage}
            />
        </div>
    );
}
