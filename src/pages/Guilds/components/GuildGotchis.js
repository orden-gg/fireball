import { useContext, useEffect } from 'react';
import { CircularProgress } from '@mui/material';

import Gotchi from 'components/Gotchi/Gotchi';
import GotchisLazy from 'components/Lazy/GotchisLazy';
import thegraphApi from 'api/thegraph.api';
import { GuildsContext } from '../GuildsContext';

import { guildContentStyles } from '../styles';

export default function GuildGotchis() {
    const { guildId, guildsData, guildGotchis, setGuildGotchis } = useContext(GuildsContext);
    const classes = guildContentStyles();

    useEffect(() => {
        let mounted = true;

        if(guildId === null) {
            return;
        }

        thegraphApi.getGotchisByAddresses(guildsData[guildId].members).then(gotchis => {
            if(mounted) {
                setGuildGotchis(gotchis);
            }
        });

        return () => mounted = false;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [guildId]);

    return (
        <div className={classes.guildGotchis}>
            {
                guildGotchis.length > 0 ? (
                    <GotchisLazy
                        items={guildGotchis}
                        renderItem={id => (
                            <Gotchi
                                gotchi={guildGotchis[id]}
                                className='narrowed'
                                render={[
                                    'svg',
                                    'name'
                                ]}
                            />
                        )}
                    />
                ) : <CircularProgress className={classes.loading} />
            }
        </div>
    );
}
