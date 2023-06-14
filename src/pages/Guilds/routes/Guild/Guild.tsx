import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, CircularProgress, IconButton, Tooltip } from '@mui/material';
import { Box } from '@mui/system';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromLoginStore from 'core/store/login';
import * as fromGuildsStore from 'pages/Guilds/store';

import { GuildButton } from 'pages/Guilds/components';
import { GuildRouteNames } from 'pages/Guilds/constants';
import { GeneralGuildStats, Guild as GuildModel } from 'pages/Guilds/models';

import { ContentInner } from 'components/Content/ContentInner';
import { CustomModal } from 'components/CustomModal/CustomModal';
import {
  AltarIcon,
  GotchiIcon,
  GotchiverseIcon,
  H1SealedPortalIcon,
  TileIcon,
  VoteIcon,
  WarehouseIcon
} from 'components/Icons/Icons';

import { GuildCard } from '../GuildsPreview/components';
import { GuildBanner, GuildDetails, GuildNav, JoinGuildModal } from './components';
import { GuildGotchis, GuildHome, GuildPortals, GuildRealm, GuildWearables } from './routes';
import { guildStyles } from './styles';

export function Guild() {
  const classes = guildStyles();

  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const currentGuild: GuildModel | null = useAppSelector(fromGuildsStore.getCurrentGuild);
  const currentGuildStats: GeneralGuildStats = useAppSelector(fromGuildsStore.getGuildStats);
  const isCurrentGuildLoading: boolean = useAppSelector(fromGuildsStore.getIsCurrentGuildLoading);
  const isCurrentGuildLoaded: boolean = useAppSelector(fromGuildsStore.getIsCurrentGuildLoaded);
  const guildMembers: string[] = useAppSelector(fromGuildsStore.getCurrentGuildMembers);
  const isContractRequestInProgress: boolean = useAppSelector(fromGuildsStore.getIsContractRequestInProgress);
  const connectedWallet: string | null | undefined = useAppSelector(fromLoginStore.getMetamaskLoggedAddress);
  const isGuildOwner: boolean = useAppSelector(fromGuildsStore.getIsGuildOwner(connectedWallet));
  const canJoinGuild: boolean = useAppSelector(fromGuildsStore.getCanJoinGuild);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isCurrentGuildLoaded) {
      dispatch(fromGuildsStore.onLoadCurrentGuildById(params.id!));
    }
  }, []);

  useEffect(() => {
    if (guildMembers.length > 0) {
      dispatch(fromGuildsStore.onLoadGuildInfo(guildMembers));
    }
  }, [guildMembers]);

  useEffect(() => {
    return () => {
      dispatch(fromGuildsStore.resetGuildInfo());
    };
  }, []);

  const onHandleJoinGuild = (): void => {
    onHandleCloseModal();
    dispatch(fromGuildsStore.onJoinGuild(currentGuild?.id!, connectedWallet!));
  };

  const onHandleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <ContentInner dataLoading={isCurrentGuildLoading}>
      {currentGuild ? (
        <Box className={classes.guildWrapper}>
          <div className={classes.guildSidebar}>
            <GuildBanner guild={currentGuild} />

            {currentGuild.description && <GuildDetails guild={currentGuild} />}

            <div className={classes.guildAssets}>
              <GuildCard.AssetsList>
                <GuildCard.Asset
                  title='Gotchis'
                  Icon={GotchiIcon}
                  value={currentGuildStats.gotchisCount}
                  cardStyle={true}
                />
                <GuildCard.Asset
                  title='Wearables'
                  Icon={WarehouseIcon}
                  value={currentGuildStats.itemsCount}
                  cardStyle={true}
                />
                <GuildCard.Asset
                  title='Portals'
                  Icon={H1SealedPortalIcon}
                  value={currentGuildStats.portalsCount}
                  cardStyle={true}
                />
                <GuildCard.Asset
                  title='Realm'
                  Icon={GotchiverseIcon}
                  value={currentGuildStats.realmCount}
                  cardStyle={true}
                />
                <GuildCard.Asset
                  title='Installations'
                  Icon={AltarIcon}
                  value={currentGuildStats.installationsCount}
                  cardStyle={true}
                />
                <GuildCard.Asset title='Tiles' Icon={TileIcon} value={currentGuildStats.tilesCount} cardStyle={true} />
                <GuildCard.Asset
                  title='Voting power'
                  Icon={VoteIcon}
                  value={currentGuildStats.votingPower}
                  cardStyle={true}
                />
              </GuildCard.AssetsList>
            </div>

            <Tooltip title='Back to guilds'>
              <IconButton
                className={classes.backButton}
                onClick={() => {
                  navigate('/guilds');
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>

            <div className={classes.guildSidebarFooter}>
              {canJoinGuild && (
                <>
                  <GuildButton
                    className={classes.guildJoin}
                    size='large'
                    disabled={isContractRequestInProgress}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Join Guild{' '}
                    {isContractRequestInProgress && (
                      <CircularProgress size={20} className={classes.joinButtonProgress} />
                    )}
                  </GuildButton>

                  <CustomModal modalOpen={isModalOpen} setModalOpen={setIsModalOpen}>
                    <JoinGuildModal onHandleCancel={onHandleCloseModal} onHandleSubmit={onHandleJoinGuild} />
                  </CustomModal>
                </>
              )}
            </div>

            {isGuildOwner && (
              <Button className={classes.guildEdit} variant='contained' size='large' disabled={true}>
                Edit Guild
              </Button>
            )}
          </div>

          <Box className={classes.guildContent}>
            <GuildNav />

            <Routes>
              <Route path={GuildRouteNames.Home} element={<GuildHome />} />
              <Route path={GuildRouteNames.Gotchis} element={<GuildGotchis />} />
              <Route path={GuildRouteNames.Wearables} element={<GuildWearables />} />
              <Route path={GuildRouteNames.Portals} element={<GuildPortals />} />
              <Route path={GuildRouteNames.Realm} element={<GuildRealm />} />
              <Route path='*' element={<Navigate to='home' replace />} />
            </Routes>
          </Box>
        </Box>
      ) : (
        <div className={classes.guildError}>Oops, something went wrong!</div>
      )}
    </ContentInner>
  );
}
