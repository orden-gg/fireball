import { createContext, useEffect, useState } from 'react';

import guildsData from 'data/guilds.json';

export const GuildsContext = createContext({});

const getModifiedGuilds = (guilds: CustomAny[]): CustomAny[] => {
  const guildsCopy: CustomAny[] = [...guilds];
  const ordenGuildIndex = guildsCopy.findIndex((guild) => guild.name === 'ordenGG');
  const ordenGuilds: CustomAny[] = guildsCopy.splice(ordenGuildIndex, 1);
  const activeGuilds: CustomAny[] = guildsCopy.filter((guild) => guild.members.length > 0);
  const inactiveGuilds: CustomAny[] = guildsCopy.filter((guild) => guild.members.length === 0);

  activeGuilds.sort((a: CustomAny, b: CustomAny) => a.name.localeCompare(b.name));
  inactiveGuilds.sort((a: CustomAny, b: CustomAny) => a.name.localeCompare(b.name));

  const modifiedGuilds: CustomAny[] = ordenGuilds.concat(activeGuilds).concat(inactiveGuilds);

  return modifiedGuilds;
};

export const GuildsContextProvider = (props: CustomAny) => {
  const [guilds] = useState<CustomAny[]>(getModifiedGuilds([...guildsData]));
  const [guildRealm, setGuildRealm] = useState<CustomAny[]>([]);
  const [guildGotchis, setGuildGotchis] = useState<CustomAny[]>([]);
  const [guildLendings, setGuildLendings] = useState<CustomAny[]>([]);
  const [guildId, setGuildId] = useState<number | null>(null);

  useEffect(() => {
    setGuildGotchis([]);
    setGuildLendings([]);
    setGuildRealm([]);
  }, [guildId]);

  return (
    <GuildsContext.Provider
      value={{
        guilds,
        guildId,
        guildGotchis,
        guildLendings,
        guildRealm,

        setGuildId,
        setGuildGotchis,
        setGuildLendings,
        setGuildRealm
      }}
    >
      {props.children}
    </GuildsContext.Provider>
  );
};
