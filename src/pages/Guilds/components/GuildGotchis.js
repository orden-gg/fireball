import React, { useContext } from 'react';

import Gotchi from 'components/Gotchi/Gotchi';
import { GuildsContext } from 'contexts/GuildsContext';

import { guildContentStyles } from '../styles';

export default function GuildGotchis() {
    const classes = guildContentStyles();
    const { guildGotchis } = useContext(GuildsContext);

    const renderGotchis = (gotchis) => {
        return gotchis.map((item) => {
            return (
                <div key={item.id} className={classes.item}>
                    <Gotchi
                        gotchi={item}
                        narrowed={true}
                        render={[
                            {
                                badges: [
                                    'owner',
                                    'level',
                                    'collateral'
                                ]
                            },
                            'svg',
                            'name',
                        ]}
                    />
                </div>
            )
        })
    }

    return (
        <div className={classes.guildGotchis}>
            {!!guildGotchis.length && renderGotchis(guildGotchis)}
        </div>
    );
}
