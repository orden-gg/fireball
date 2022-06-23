import { GotchiHeartGif } from 'components/Icons/Icons';

import { styles } from './styles';

export function GotchiKinship({ gotchi }: { gotchi: any }) {
    const classes = styles();

    return (
        <div className={classes.gotchiKinship}>
            <GotchiHeartGif className={classes.gotchiKinshipIcon} width={12} height={12} />
            {gotchi.kinship}
        </div>
    );
}
