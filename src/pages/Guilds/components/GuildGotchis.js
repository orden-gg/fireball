import React, { useContext } from 'react';

import Gotchi from 'components/Gotchi/Gotchi';
import { GuildsContext } from 'pages/Guilds/GuildsContext';

import { guildContentStyles } from '../styles';

export default function GuildGotchis() {
    const classes = guildContentStyles();
    const { currentGuild } = useContext(GuildsContext);

    const renderGotchis = gotchis => {
        return gotchis.map(item => {
            return (
                <div key={item.id} className={classes.item}>
                    <Gotchi
                        gotchi={item}
                        narrowed={true}
                        render={[
                            'svg',
                            'name'
                        ]}
                    />
                </div>
            )
        })
    }

    return (
        <div className={classes.guildGotchis}>
            {renderGotchis(currentGuild.gotchis || [])}
        </div>
    );
}
