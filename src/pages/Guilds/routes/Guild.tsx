import { useContext, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { CommonUtils } from 'utils';

import { GuildBanner } from '../components/GuildBanner';
import { GuildsDetails } from '../components/GuildDetails';
import { GuildGotchis } from '../components/GuildGotchis';
import { GuildLendings } from '../components/GuildLendings';
import { GuildNav } from '../components/GuildNav';
import { GuildsRealm } from '../components/GuildsRealm';
import { GuildsContext } from '../GuildsContext';
import { guildStyles } from '../styles';

export function Guild() {
    const classes = guildStyles();

    const params = useParams<{ name: string }>();
    const navigate = useNavigate();

    const { guilds, guildId, setGuildId } = useContext<any>(GuildsContext);

    useEffect(() => {
        const guildId: any = guilds.findIndex((guild: any) => (
            CommonUtils.stringToKey(guild.name) === params.name
        ));

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

                    <Tooltip
                        title='Back to guilds'
                    >
                        <IconButton className={classes.backButton} onClick={ () => { navigate('/guilds')} } >
                            <ArrowBackIcon />
                        </IconButton>
                    </Tooltip>
                </div>

                <Box className={classes.guildContent}>
                    <GuildNav />
                    <Routes>
                        <Route path='gotchis' element={<GuildGotchis />} />
                        <Route path='lendings' element={<GuildLendings />} />
                        <Route path='realm' element={ <GuildsRealm /> } />
                        <Route path='*' element={<Navigate to='gotchis' replace />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}
