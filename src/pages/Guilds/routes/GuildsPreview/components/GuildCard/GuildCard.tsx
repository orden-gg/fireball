import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Divider } from '@mui/material';

import { useAppDispatch } from 'core/store/hooks';
import * as fromGuildsStore from 'pages/Guilds/store';

import { GuildLogo, GuildWearables } from 'pages/Guilds/components';

import { FudIcon, GhstTokenIcon, GotchiIcon, WarehouseIcon } from 'components/Icons/Icons';

import { CommonUtils } from 'utils';

import { useHoverRotation } from '../../hooks';
import { GuildAsset, GuildDescription } from './components';
import { GuildCardButton, guildCardStyles } from './styles';

export function GuildCard({ guild }: { guild: CustomAny }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const classes = guildCardStyles();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleClick = (guild: CustomAny): void => {
    navigate(`${CommonUtils.stringToKey(guild.name)}`);

    dispatch(fromGuildsStore.onSetGuild(guild));
  };

  useHoverRotation({ targetRef, childRef });

  return (
    <div className={classes.guildCard} ref={targetRef}>
      <div ref={childRef} className={classes.guildCardInner}>
        <div className={classes.guildTop}>
          <div className={classes.guildLogo}>
            <GuildLogo logo={guild.logo} className={classes.guildLogoImage} />
          </div>
          <div className={classes.guildBody}>
            <p className={classes.guildName}>{guild.name}</p>

            <ul className={classes.guildAssetsList}>
              <GuildAsset title='Gotchis' Icon={GotchiIcon} />
              <GuildAsset title='Wearables' Icon={WarehouseIcon} />
              <GuildAsset title='Realm' Icon={FudIcon} />
              <GuildAsset title='Voting power' Icon={GhstTokenIcon} />
            </ul>
            <GuildWearables wearables={guild.wearables} tooltip='Guild wearable' />
          </div>
        </div>
        <div className={classes.guildContent}>
          <Divider className={classes.divider} />

          <GuildDescription truncate={145}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis ducimus in quos magnam voluptate
            explicabo dicta cupiditate, hic accusantium eos.
          </GuildDescription>

          <div className={classes.guildFooter}>
            <GuildCardButton
              className={classes.guildButton}
              variant='outlined'
              onClick={() => {
                handleClick(guild);
              }}
            >
              View guild
            </GuildCardButton>
          </div>
        </div>
      </div>
    </div>
  );
}
