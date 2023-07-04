import classNames from 'classnames';

import { CardImage } from 'components/ItemCard/components';
import { CustomTooltip } from 'components/custom/CustomTooltip';

import { ItemUtils } from 'utils';

import { guildWearblesStyles } from './styles';

interface GuildWearablesProps {
  wearables: string[];
  className?: string;
  tooltip?: string;
}

export function GuildWearables({ wearables, className, tooltip }: GuildWearablesProps) {
  const classes = guildWearblesStyles();

  const renderWearableImage = (id: string): JSX.Element => (
    <CardImage className={classNames(classes.guildWearable, className)} id={Number(id)} key={id} />
  );

  return wearables ? (
    <div className={classes.guildWearables}>
      {wearables.map((id: string) =>
        tooltip !== undefined ? (
          <CustomTooltip title={ItemUtils.getNameById(id)} followCursor placement='top' key={id}>
            <span>{renderWearableImage(id)}</span>
          </CustomTooltip>
        ) : (
          renderWearableImage(id)
        )
      )}
    </div>
  ) : (
    <></>
  );
}
