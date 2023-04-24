import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Tooltip } from '@mui/material';
import { Box } from '@mui/system';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromGuildsStore from 'pages/Guilds/store';

import { CommonUtils } from 'utils';

import guilds from 'data/guilds.json';

import { GuildBanner, GuildDetails } from './components';
import { guildStyles } from './styles';

// import { GuildGotchis } from './components/GuildGotchis';
// import { GuildLendings } from './components/GuildLendings';
// import { GuildNav } from './components/GuildNav';
// import { GuildsRealm } from './components/GuildsRealm';

export function Guild() {
  const classes = guildStyles();

  const dispatch = useAppDispatch();

  const params = useParams<{ name: string }>();
  const navigate = useNavigate();

  const currentGuild = useAppSelector(fromGuildsStore.getCurrentGuild);

  useEffect(() => {
    const guild: CustomAny = guilds.find((guild: CustomAny) => CommonUtils.stringToKey(guild.name) === params.name);

    if (guild === undefined) {
      navigate('/guilds');
    } else {
      dispatch(fromGuildsStore.onSetGuild({ name: 'ss', description: 'sss', logo: 'sss', id: 'ss' }));
    }
  }, []);

  console.log(currentGuild);

  return (
    <>
      <Box className={classes.guildWrapper}>
        <div className={classes.guildSidebar}>
          <GuildBanner />

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
          {/* <GuildNav /> */}
          <Routes>
            {/* <Route path='gotchis' element={<GuildGotchis />} />
            <Route path='lendings' element={<GuildLendings />} />
            <Route path='realm' element={<GuildsRealm />} /> */}
            <Route path='*' element={<Navigate to='gotchis' replace />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}
