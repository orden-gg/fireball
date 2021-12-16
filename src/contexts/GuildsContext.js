import React, {createContext, useState} from 'react';
import guilds from '../data/guilds';

export const GuildsContext = createContext({});

const GuildsContextProvider = (props) => {
    const [ guildsData, setGuildsData ] = useState(guilds);
    const [ currentGuild, setCurrentGuild ] = useState([]);

    const [ guildGotchis, setGuildGotchis ] = useState([]);

    return (
        <GuildsContext.Provider value={{

            guildGotchis,
            setGuildGotchis,

            guildsData,
            
            currentGuild,
            setCurrentGuild

        }}>
            { props.children }
        </GuildsContext.Provider>
    )
}

export default GuildsContextProvider;
