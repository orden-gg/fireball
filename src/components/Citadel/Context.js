import React, {createContext, useState} from 'react';
import guilds from '../data/guilds';

export const CitadelContext = createContext({});

const CitadelContextProvider = (props) => {
    const [ guildsData, setGuildsData ] = useState(guilds);
    const [ selectedShape, setSelectedShape ] = useState(null);

    const [ guildGotchis, setGuildGotchis ] = useState([]);

    return (
        <CitadelContext.Provider value={{
            selectedShape,
            setSelectedShape

        }}>
            { props.children }
        </CitadelContext.Provider>
    )
}

export default CitadelContextProvider;
