import { useContext, useEffect } from 'react';
import { CircularProgress } from '@mui/material';

import Gotchi from 'components/Gotchi/Gotchi';
import GotchisLazy from 'components/Lazy/GotchisLazy';
import { GuildsContext } from '../GuildsContext';
import thegraphApi from 'api/thegraph.api';

import { guildContentStyles } from '../styles';

export default function GuildLendings() {
    const classes = guildContentStyles();
    const { guildId, guildsData, guildLendings, setGuildLendings } = useContext(GuildsContext);

    useEffect(() => {
        let mounted = true;

        if(guildId === null) {
            return;
        }

        const promises = guildsData[guildId].members.map(address => thegraphApi.getLendingsByAddress(address));

        Promise.all(promises).then(responses => {
            if(mounted) {
                const lendings = responses.reduce((result, current) => result.concat(current), []);

                setGuildLendings(lendings);
            }
        });

        return () => mounted = false;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [guildId]);

    return (
        <div className={classes.guildGotchis}>
            {
                guildLendings?.length > 0 ? (
                    <GotchisLazy
                        items={guildLendings}
                        renderItem={id => (
                            <Gotchi
                                gotchi={guildLendings[id]}
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
