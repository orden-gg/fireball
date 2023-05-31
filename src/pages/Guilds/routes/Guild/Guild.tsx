import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoadingButton } from '@mui/lab';
import { Button, IconButton, Tooltip } from '@mui/material';
import { Box } from '@mui/system';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromLoginStore from 'core/store/login';
import * as fromGuildsStore from 'pages/Guilds/store';

import { GuildRouteNames } from 'pages/Guilds/constants';
import { Guild as GuildModel } from 'pages/Guilds/models';

import { ContentInner } from 'components/Content/ContentInner';
import { CustomModal } from 'components/CustomModal/CustomModal';

import { GuildBanner, GuildDetails, GuildNav, JoinGuildModal } from './components';
import { GuildGotchis, GuildHome, GuildPortals, GuildRealm, GuildWarehouse } from './routes';
import { guildStyles } from './styles';

export function Guild() {
  const classes = guildStyles();

  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const currentGuild: GuildModel | null = useAppSelector(fromGuildsStore.getCurrentGuild);
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

            <GuildDetails guild={currentGuild} />

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

            {canJoinGuild && (
              <>
                <LoadingButton
                  className={classes.guildJoin}
                  variant='contained'
                  size='large'
                  loading={isContractRequestInProgress}
                  loadingPosition='center'
                  disabled={isContractRequestInProgress}
                  onClick={() => setIsModalOpen(true)}
                >
                  Join Guild
                </LoadingButton>

                <CustomModal modalOpen={isModalOpen} setModalOpen={setIsModalOpen}>
                  <JoinGuildModal onHandleCancel={onHandleCloseModal} onHandleSubmit={onHandleJoinGuild} />
                </CustomModal>
              </>
            )}

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
              <Route path={GuildRouteNames.Warehouse} element={<GuildWarehouse />} />
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
