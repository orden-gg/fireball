import { useNavigate } from 'react-router-dom';

import { Button, Divider } from '@mui/material';

import { GuildLogo, GuildWearables } from 'pages/Guilds/components';

import { FudIcon, GhstTokenIcon, GotchiIcon, LendingIcon, WarehouseIcon } from 'components/Icons/Icons';

import { CommonUtils } from 'utils';

import { GuildAsset } from '../GuildAsset/GuildAsset';
import { guildCardStyles } from './styles';

export function GuildCard({ guild }: { guild: CustomAny }) {
  const classes = guildCardStyles();

  const navigate = useNavigate();

  const handleClick = (guild: CustomAny): void => {
    navigate(`${CommonUtils.stringToKey(guild.name)}`);
  };

  return (
    <div
      className={classes.guildCard}
      onClick={() => {
        handleClick(guild);
      }}
    >
      <div className={classes.guildTop}>
        <div className={classes.guildLogo}>
          <GuildLogo logo={guild.logo} className={classes.guildLogoImage} />
        </div>
        <div className={classes.guildBody}>
          <p className={classes.guildName}>{guild.name}</p>
          <GuildWearables wearables={guild.wearables} tooltip='Guild wearable' />
        </div>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.guildBottom}>
        <ul className={classes.guildAssetsList}>
          <GuildAsset title='Gotchis' Icon={GotchiIcon} />
          <GuildAsset title='Lendings' Icon={LendingIcon} />
          <GuildAsset title='Wearables' Icon={WarehouseIcon} />
          <GuildAsset title='Realm' Icon={FudIcon} />
          <GuildAsset title='Voting power' Icon={GhstTokenIcon} />
        </ul>

        <p className={classes.guildDescription}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis ducimus in quos magnam voluptate
          explicabo dicta cupiditate, hic accusantium eos.
        </p>

        <Button className={classes.guildViewBtn} variant='outlined'>
          View guild
        </Button>
      </div>
    </div>
  );
}
