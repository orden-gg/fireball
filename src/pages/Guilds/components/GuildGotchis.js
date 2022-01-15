import React, { useEffect, useContext } from 'react';
import { guildContentStyles } from '../styles';
import Gotchi from '../../../components/Gotchi/Gotchi';
import { GuildsContext } from '../../../contexts/GuildsContext';
import { Box } from '@mui/system';

export default function GuildsGotchis() {
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

    useEffect( () => {
        
    }, [guildGotchis]);

    return (
        <div className={classes.guildGotchis}>
            {!!guildGotchis.length && renderGotchis(guildGotchis)}
        </div>
    );
}
