import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import classNames from 'classnames';

// store
import * as fromGuildsStore from '../../store';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromLoginStore from 'core/store/login';

import { GuildButton, GuildLogo } from 'pages/Guilds/components';

import { ContentInner } from 'components/Content/ContentInner';
import {
  // AltarIcon,
  GotchiIcon,
  GotchiverseIcon,
  H1SealedPortalIcon, // TileIcon,
  // VoteIcon,
  WarehouseIcon
} from 'components/Icons/Icons';

import { GeneralGuildStats, Guild } from '../../models';
import { GuildCard } from './components/GuildCard/GuildCard';
import { guildsPreviewStyles } from './styles';

export function GuildsPreview() {
  const classes = guildsPreviewStyles();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const connectedWallet: string | undefined | null = useAppSelector(fromLoginStore.getMetamaskLoggedAddress);
  const guilds: Guild[] = useAppSelector(fromGuildsStore.getGuilds);
  const getIsGuildsLoading: boolean = useAppSelector(fromGuildsStore.getIsGuildsLoading);
  const guildsStats: Record<string, GeneralGuildStats> = useAppSelector(fromGuildsStore.getGuildsStats);

  useEffect(() => {
    dispatch(fromGuildsStore.onLoadGuilds());
  }, []);

  const onRedirectToCreateGuild = (): void => {
    navigate('create');
  };

  const handleClick = (guild: Guild): void => {
    navigate(guild.safeAddress);

    dispatch(fromGuildsStore.setCurrentGuild(guild));
  };

  return (
    <div className={classes.guildsWrapper}>
      <div className={classes.guildsPreviewTop}>
        <h1 className={classes.guildsPreviewTitle}>Aavegotchi guilds</h1>
        {connectedWallet && (
          <Button className={classes.guildCreate} variant='contained' onClick={() => onRedirectToCreateGuild()}>
            Create
          </Button>
        )}
      </div>
      <ContentInner dataLoading={getIsGuildsLoading} className={classes.guildsPreviewContent}>
        <ul className={classes.guildsList}>
          {guilds.map((guild: Guild, index: number) => {
            const stats: GeneralGuildStats = guildsStats[guild.safeAddress];

            return (
              <GuildCard key={index}>
                <GuildCard.Top>
                  <GuildCard.Image>
                    <GuildLogo logo={guild.logo} className={classNames(classes.guildLogoImage, 'guild-card-image')} />
                  </GuildCard.Image>
                  <GuildCard.Body>
                    <GuildCard.Name>{guild.name}</GuildCard.Name>

                    <GuildCard.AssetsList>
                      {stats && (
                        <>
                          <GuildCard.Asset title='Gotchis' Icon={GotchiIcon} value={stats.gotchisCount} />
                          <GuildCard.Asset title='Wearables' Icon={WarehouseIcon} value={stats.itemsCount} />
                          <GuildCard.Asset title='Portals' Icon={H1SealedPortalIcon} value={stats.portalsCount} />
                          <GuildCard.Asset title='Realm' Icon={GotchiverseIcon} value={stats.realmCount} />
                          {/* <GuildCard.Asset title='Installations' Icon={AltarIcon} value={stats.installationsCount} /> */}
                          {/* <GuildCard.Asset title='Tiles' Icon={TileIcon} value={stats.tilesCount} />
                          <GuildCard.Asset title='Voting power' Icon={VoteIcon} value={stats.votingPower} /> */}
                        </>
                      )}
                    </GuildCard.AssetsList>
                  </GuildCard.Body>
                </GuildCard.Top>
                <GuildCard.Footer>
                  <GuildButton variant='outlined' onClick={() => handleClick(guild)}>
                    View guild
                  </GuildButton>
                </GuildCard.Footer>
              </GuildCard>
            );
          })}
        </ul>
      </ContentInner>
    </div>
  );
}
