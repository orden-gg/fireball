import installationsUtils from 'utils/installationsUtils';

import { styles } from './styles';

export function InstallationImage({ id }: { id: string }) {
    const classes = styles();

    const name: string = installationsUtils.getNameById(id) as string;
    const src: string = installationsUtils.getImageById(id);

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
