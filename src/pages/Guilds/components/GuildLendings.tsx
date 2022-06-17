import { useContext, useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

import { Gotchi } from 'components/Gotchi/Gotchi';
import { GotchisLazy } from 'components/Lazy/GotchisLazy';
import thegraphApi from 'api/thegraph.api';

import { GuildsContext } from '../GuildsContext';
import { guildContentStyles } from '../styles';

export function GuildLendings() {
    const classes = guildContentStyles();

    const { guildId, guilds, guildLendings, setGuildLendings } = useContext<any>(GuildsContext);

    const [isLendingsLoading, setIsLendingsLoading] = useState(false);

    useEffect(() => {
        let mounted = true;

        if (guildId === null) {
            return;
        }

        setIsLendingsLoading(true);

        const promises: any[] = guilds[guildId].members.map(address => thegraphApi.getLendingsByAddress(address));

        Promise.all(promises).then((responses: any[]) => {
            if (mounted) {
                const lendings: any = responses.reduce((result, current) => result.concat(current), []);

                setGuildLendings(lendings);
            }
        }).finally(() => setIsLendingsLoading(false));

        return () => { mounted = false };
    }, [guilds, guildId, setGuildLendings]);

    return (
        <div className={classes.guildGotchis}>
            {isLendingsLoading ? (
                <CircularProgress className={classes.loading} />
            ) : guildLendings?.length > 0 ? (
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
                ) : (
                    <div className={classes.noData}>No Gotchi Lendings :(</div>
                )
            }
        </div>
    );
}
