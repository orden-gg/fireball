import { CustomTooltip } from 'components/custom/CustomTooltip';
import { GotchiHeartGif } from 'components/Icons/Icons';

import { GotchiKinshipTooltip } from './GotchiKinshitTooltip';
import { styles } from './styles';

export function GotchiKinship({ gotchi }: { gotchi: any }) {
    const classes = styles();

    return (
        <CustomTooltip
            title={<GotchiKinshipTooltip kinship={gotchi.kinship} />}
            placement='bottom'
            arrow={true}
        >
            <div className={classes.gotchiKinship}>
                <GotchiHeartGif
                    className={classes.gotchiKinshipIcon}
                    width={12}
                    height={12}
                />
                {gotchi.kinship}
            </div>
        </CustomTooltip>
    );
}
