import classNames from 'classnames';

import { CardImage } from 'components/ItemCard/components';
import { CustomTooltip } from 'components/custom/CustomTooltip';

import { ItemUtils } from 'utils';

import { guildWearables } from '../styles';

interface GuildWearablesProps {
  wearables: CustomAny;
  className: string;
  tooltip?: string;
}

export function GuildWearables({ wearables, className, tooltip }: GuildWearablesProps) {
  const classes = guildWearables();

  const renderWearableImage = (id: string): JSX.Element => (
    <CardImage className={classNames(classes.guildWearable, className || null)} id={Number(id)} key={id} />
  );

  return wearables.map((id: CustomAny) =>
    tooltip !== undefined ? (
      <CustomTooltip title={ItemUtils.getNameById(id)} followCursor placement='top' key={id}>
        <span>{renderWearableImage(id)}</span>
      </CustomTooltip>
    ) : (
      renderWearableImage(id)
    )
  );
}
