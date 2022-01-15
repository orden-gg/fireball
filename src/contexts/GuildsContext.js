import React, {createContext, useState} from 'react';
import guildsData from '../data/guilds';

export const GuildsContext = createContext({});

const GuildsContextProvider = (props) => {
    const [ currentGuild, setCurrentGuild ] = useState([]);

    const [ guildGotchis, setGuildGotchis ] = useState([]);
    const [ guildRealm, setGuildRealm ] = useState([]);
    const [ realmView, setRealmView ] = useState('map');

    return (
        <GuildsContext.Provider value={{

            guildGotchis,
            setGuildGotchis,

            guildRealm,
            setGuildRealm,

            guildsData,
            
            currentGuild,
            setCurrentGuild,
            realmView, setRealmView

        }}>
            { props.children }
        </GuildsContext.Provider>
    )
}

export default GuildsContextProvider;
