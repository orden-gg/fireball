import { useContext, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Tooltip } from '@mui/material';
import { Box } from '@mui/system';

import { CommonUtils } from 'utils';

import { GuildsContext } from '../GuildsContext';
import { GuildBanner } from '../components/GuildBanner';
import { GuildsDetails } from '../components/GuildDetails';
import { GuildGotchis } from '../components/GuildGotchis';
import { GuildLendings } from '../components/GuildLendings';
import { GuildNav } from '../components/GuildNav';
import { GuildsRealm } from '../components/GuildsRealm';
import { guildStyles } from '../styles';

export function Guild() {
  const classes = guildStyles();

  const params = useParams<{ name: string }>();
  const navigate = useNavigate();

  const { guilds, guildId, setGuildId } = useContext<CustomAny>(GuildsContext);

  useEffect(() => {
    const guildId: CustomAny = guilds.findIndex(
      (guild: CustomAny) => CommonUtils.stringToKey(guild.name) === params.name
    );

    if (guildId === undefined || guilds[guildId].members?.length === 0) {
      navigate('/guilds');
    } else {
      setGuildId(guildId);
    }
  }, []);

  return (
    <>
      <Box className={classes.guildWrapper}>
        <div className={classes.guildSidebar}>
          <GuildBanner />
          {<GuildsDetails guild={guilds[guildId]} />}

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
            <Route path='gotchis' element={<GuildGotchis />} />
            <Route path='lendings' element={<GuildLendings />} />
            <Route path='realm' element={<GuildsRealm />} />
            <Route path='*' element={<Navigate to='gotchis' replace />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}
