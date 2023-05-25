import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Divider } from '@mui/material';

import { useAppDispatch } from 'core/store/hooks';
import * as fromGuildsStore from 'pages/Guilds/store';

import { GuildLogo, GuildWearables } from 'pages/Guilds/components';
import { Guild, GuildStats } from 'pages/Guilds/models';

import { GotchiIcon, H1SealedPortalIcon, VoteIcon, WarehouseIcon } from 'components/Icons/Icons';

import { useHoverRotation } from '../../hooks';
import { GuildAsset, GuildDescription } from './components';
import { GuildCardButton, guildCardStyles } from './styles';

export function GuildCard({ guild, stats }: { guild: Guild; stats: GuildStats }) {
  const classes = guildCardStyles();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const targetRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  useHoverRotation({ targetRef, childRef });

  const handleClick = (guild: Guild): void => {
    navigate(guild.safeAddress);

    dispatch(fromGuildsStore.setCurrentGuild(guild));
  };

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
              {stats && (
                <>
                  <GuildAsset title='Gotchis' Icon={GotchiIcon} value={stats.gotchisAmount} />
                  <GuildAsset title='Wearables' Icon={WarehouseIcon} value={stats.itemsAmount} />
                  <GuildAsset title='Portals' Icon={H1SealedPortalIcon} value={stats.portalsAmount} />
                  <GuildAsset title='Voting power' Icon={VoteIcon} value={stats.votingPower} />
                </>
              )}
            </ul>
            <GuildWearables wearables={[]} tooltip='Guild wearable' />
          </div>
        </div>
        <div className={classes.guildContent}>
          <Divider className={classes.divider} />

          <GuildDescription truncate={145}>{guild.description}</GuildDescription>

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
