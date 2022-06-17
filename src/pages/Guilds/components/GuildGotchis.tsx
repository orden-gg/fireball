import { useContext, useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

import { Gotchi } from 'components/Gotchi/Gotchi';
import { GotchisLazy } from 'components/Lazy/GotchisLazy';
import thegraphApi from 'api/thegraph.api';

import { GuildsContext } from '../GuildsContext';
import { guildContentStyles } from '../styles';

export function GuildGotchis() {
    const classes = guildContentStyles();

    const { guildId, guilds, guildGotchis, setGuildGotchis } = useContext<any>(GuildsContext);

    const [isGotchisLoading, setIsGotchisLoading] = useState(false);

    useEffect(() => {
        let mounted = true;

        if (guildId === null) {
            return;
        }

        setIsGotchisLoading(true);

        thegraphApi.getGotchisByAddresses(guilds[guildId].members).then(gotchis => {
            if (mounted) {
                setGuildGotchis(gotchis);
            }
        }).finally(() => setIsGotchisLoading(false));

        return () => { mounted = false };
    }, [guilds, guildId, setGuildGotchis]);

    return (
        <div className={classes.guildGotchis}>
            {isGotchisLoading ? (
                <CircularProgress className={classes.loading} />
            ) : guildGotchis.length > 0 ? (
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
                ) : (
                    <div className={classes.noData}>No Gotchis :(</div>
                )
            }
        </div>
    );
}
