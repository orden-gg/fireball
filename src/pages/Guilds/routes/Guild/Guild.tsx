import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, IconButton, Tooltip } from '@mui/material';
import { Box } from '@mui/system';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromGuildsStore from 'pages/Guilds/store';

import { GuildRouteNames } from 'pages/Guilds/constants';
import { Guild as GuildModel } from 'pages/Guilds/models';

import { GuildBanner, GuildDetails, GuildNav } from './components';
import { GuildGotchis, GuildWarehouse } from './routes';
import { guildStyles } from './styles';

// import { GuildLendings } from './components/GuildLendings';
// import { GuildNav } from './components/GuildNav';
// import { GuildsRealm } from './components/GuildsRealm';

export function Guild() {
  const classes = guildStyles();

  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const currentGuild: GuildModel | null = useAppSelector(fromGuildsStore.getCurrentGuild);
  const isCurrentGuildLoaded: boolean = useAppSelector(fromGuildsStore.getIsCurrentGuildLoaded);

  useEffect(() => {
    if (!isCurrentGuildLoaded) {
      dispatch(fromGuildsStore.onLoadCurrentGuildById(params.id!));
    }
  }, []);

  const handleJoinGuild = (guildSafeAddress: string): void => {
    dispatch(fromGuildsStore.onJoinGuild(guildSafeAddress));
  };

  return isCurrentGuildLoaded ? (
    <>
      <Box className={classes.guildWrapper}>
        <div className={classes.guildSidebar}>
          <GuildBanner guild={currentGuild!} />

          <GuildDetails guild={currentGuild!} />

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
        </div>

        <Box className={classes.guildContent}>
          <GuildNav />

          <Routes>
            <Route path='gotchis/*'>
              <Route path={GuildRouteNames.Owned} element={<GuildGotchis type={GuildRouteNames.Owned} />} />
              <Route path={GuildRouteNames.Borrowed} element={<GuildGotchis type={GuildRouteNames.Borrowed} />} />
              <Route path={GuildRouteNames.Lended} element={<GuildGotchis type={GuildRouteNames.Lended} />} />
              <Route path='*' element={<Navigate to={GuildRouteNames.Owned} replace />} />
            </Route>
            <Route path={GuildRouteNames.Warehouse} element={<GuildWarehouse />} />
            {/* <Route path='lendings' element={<GuildLendings />} />
            <Route path='realm' element={<GuildsRealm />} /> */}
            {/* <Route path='*' element={<Navigate to='gotchis' replace />} /> */}
          </Routes>

          <Button
            className={classes.guildJoin}
            variant='contained'
            size='large'
            onClick={() => handleJoinGuild(currentGuild?.id!)}
          >
            Join Guild
          </Button>
        </Box>
      </Box>
    </>
  ) : (
    <div>Loading...</div>
  );
}
