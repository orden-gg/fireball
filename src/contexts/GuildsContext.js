import React, {createContext, useEffect, useState} from 'react';
import guilds from '../data/guilds';

import { ReactComponent as Placeholder } from '../assets/images/svgs/ghst.svg';
export const GuildsContext = createContext({});

const GuildsContextProvider = (props) => {
    const [ guildsData, setGuildsData ] = useState(guilds);
    const [ guildData, setGuildData ] = useState([]);

    const [ allGotchis, setAllGotchis ] = useState([]);
    const [ guildGotchis, setGuildGotchis ] = useState([]);

    useEffect( () => {
        if(!guildData.length && !allGotchis.length) return;
        
        let filteredGitchis = allGotchis.filter( gotchi => (
            guildData.members.some( member => (
                member.toLowerCase() === gotchi.owner.id.toLowerCase()
            ))
        )).sort((a,b) => (
            b.modifiedRarityScore - a.modifiedRarityScore
        ));

        setGuildGotchis(filteredGitchis);

    }, [guildData, allGotchis]);

    return (
        <GuildsContext.Provider value={{

            Placeholder,

            allGotchis,
            setAllGotchis,

            guildGotchis,

            guildsData,
            
            guildData,
            setGuildData,

            // guildPath,
            // setGuildPath

        }}>
            { props.children }
        </GuildsContext.Provider>
    )
}

export default GuildsContextProvider;
