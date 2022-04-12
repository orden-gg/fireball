import classNames from 'classnames';

import WearableImage from 'components/Items/Wearable/WearableImage';
import { guildWearables } from '../styles';

export default function GuildWearables({wearables, className}) {
    const classes = guildWearables();

    return wearables.map(id =>
        <WearableImage
            className={classNames(classes.guildWearable, className || null)}
            wearable={{id: id}}
            key={id}
        />
    )
}
