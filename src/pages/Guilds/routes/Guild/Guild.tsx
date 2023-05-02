import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Tooltip } from '@mui/material';
import { Box } from '@mui/system';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromGuildsStore from 'pages/Guilds/store';

import { GuildRouteNames } from 'pages/Guilds/constants';

import { CommonUtils } from 'utils';

import guilds from 'data/guilds.json';

import { GuildBanner, GuildDetails, GuildNav } from './components';
import { GuildGotchis, GuildWarehouse } from './routes';
import { guildStyles } from './styles';

// import { GuildLendings } from './components/GuildLendings';
// import { GuildNav } from './components/GuildNav';
// import { GuildsRealm } from './components/GuildsRealm';

export function Guild() {
  const classes = guildStyles();

  const params = useParams<{ name: string }>();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const currentGuild: CustomAny = useAppSelector(fromGuildsStore.getCurrentGuild);

  useEffect(() => {
    const guild: CustomAny = guilds.find((guild: CustomAny) => CommonUtils.stringToKey(guild.name) === params.name);

    if (guild === undefined) {
      navigate('/guilds');
    } else {
      dispatch(
        fromGuildsStore.onSetGuild({
          name: 'ss',
          description: 'sss',
          logo: 'sss',
          id: 'ss',
          members: guilds[0].members
        })
      );
      navigate('gotchis');
    }
  }, []);

  return currentGuild ? (
    <>
      <Box className={classes.guildWrapper}>
        <div className={classes.guildSidebar}>
          <GuildBanner guild={guilds[0]} />

          <GuildDetails guild={guilds[0]} />

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
        </Box>
      </Box>
    </>
  ) : (
    <></>
  );
}
