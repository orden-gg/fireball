import { Tooltip } from '@mui/material';

import classNames from 'classnames';

import WearableImage from 'components/Items/Wearable/WearableImage';

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
                <Tooltip key={id} title='Guild wearable' followCursor placement='top'>
                    <span>
                        {renderWearableImage(id)}
                    </span>
                </Tooltip>
            ) : (
                renderWearableImage(id)
            )
        )
    );
}
