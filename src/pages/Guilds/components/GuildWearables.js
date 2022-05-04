import classNames from 'classnames';

import CustomTooltip from 'components/custom/CustomTooltip';
import WearableImage from 'components/Items/Wearable/WearableImage';
import itemUtils from 'utils/itemUtils';

import { guildWearables } from '../styles';

export default function GuildWearables({ tooltip, wearables, className }) {
    const classes = guildWearables();

    const renderWearableImage = (id) => (
        <WearableImage
            className={classNames(classes.guildWearable, className || null)}
            wearable={{id: id}}
            key={id}
        />
    )

    return (
        wearables.map(id =>
            tooltip !== undefined ? (
                <CustomTooltip
                    title={itemUtils.getItemNameById(id)}
                    followCursor
                    placement='top'
                    key={id}
                >
                    <span>
                        {renderWearableImage(id)}
                    </span>
                </CustomTooltip>
            ) : (
                renderWearableImage(id)
            )
        )
    );
}
