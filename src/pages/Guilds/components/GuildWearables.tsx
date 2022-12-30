import classNames from 'classnames';

import { CustomTooltip } from 'components/custom/CustomTooltip';
import { CardImage } from 'components/ItemCard/components';
import { ItemUtils } from 'utils';

import { guildWearables } from '../styles';

interface GuildWearablesProps {
    wearables: any;
    className: string;
    tooltip?: string;
}

export function GuildWearables({ wearables, className, tooltip }: GuildWearablesProps) {
    const classes = guildWearables();

    const renderWearableImage = (id: string): JSX.Element => (
        <CardImage
            className={classNames(classes.guildWearable, className || null)}
            id={Number(id)}
            key={id}
        />
    );

    return (
        wearables.map((id: any) =>
            tooltip !== undefined ? (
                <CustomTooltip
                    title={ItemUtils.getNameById(id)}
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
