import { InstallationsUtils } from 'utils';

import { styles } from './styles';

export function InstallationImage({ id }: { id: string }) {
    const classes = styles();

    const name: string = InstallationsUtils.getNameById(id) as string;
    const src: string = InstallationsUtils.getImageById(id);

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
