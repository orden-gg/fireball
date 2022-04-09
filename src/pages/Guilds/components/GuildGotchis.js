import React, { useContext } from 'react';

import Gotchi from 'components/Gotchi/Gotchi';
import { GuildsContext } from 'pages/Guilds/GuildsContext';

import GotchisLazy from 'components/Lazy/GotchisLazy';
import { guildContentStyles } from '../styles';

export default function GuildGotchis() {
    const classes = guildContentStyles();
    const { currentGuild } = useContext(GuildsContext);

    return (
        <div className={classes.guildGotchis}>
            {
                currentGuild.gotchis?.length > 0 ? (
                    <GotchisLazy
                        items={currentGuild.gotchis}
                        renderItem={id => (
                            <Gotchi
                                gotchi={currentGuild.gotchis[id]}
                                narrowed={true}
                                render={[
                                    'svg',
                                    'name'
                                ]}
                            />
                        )}
                    />
                ) : null
            }
        </div>
    );
}
