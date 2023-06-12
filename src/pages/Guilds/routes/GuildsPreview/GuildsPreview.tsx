import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// store
import * as fromGuildsStore from '../../store';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromLoginStore from 'core/store/login';

import { GuildButton } from 'pages/Guilds/components';

import { ContentInner } from 'components/Content/ContentInner';

import { GeneralGuildStats, Guild } from '../../models';
import { GuildCard } from './components/GuildCard/GuildCard';
import { guildsPreviewStyles } from './styles';

export function GuildsPreview() {
  const classes = guildsPreviewStyles();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const connectedWallet: string | undefined | null = useAppSelector(fromLoginStore.getMetamaskLoggedAddress);
  const guilds: Guild[] = useAppSelector(fromGuildsStore.getGuilds);
  const getIsGuildsLoading: boolean = useAppSelector(fromGuildsStore.getIsGuildsLoading);
  const guildsStats: Record<string, GeneralGuildStats> = useAppSelector(fromGuildsStore.getGuildsStats);

  useEffect(() => {
    dispatch(fromGuildsStore.onLoadGuilds());
  }, []);

  const onRedirectToCreateGuild = (): void => {
    navigate('create');
  };

  return (
    <div className={classes.guildsWrapper}>
      <h1 className={classes.guildsPreviewTitle}>Aavegotchi guilds</h1>
      {connectedWallet && (
        <GuildButton
          className={classes.guildCreate}
          variant='outlined'
          size='large'
          onClick={() => onRedirectToCreateGuild()}
        >
          Create Guild
        </GuildButton>
      )}
      <ContentInner dataLoading={getIsGuildsLoading} className={classes.guildsPreviewContent}>
        <ul className={classes.guildsList}>
          {guilds.map((guild: Guild, index: number) => (
            <GuildCard guild={guild} stats={guildsStats[guild.safeAddress]} key={index} />
          ))}
        </ul>
      </ContentInner>
    </div>
  );
}
