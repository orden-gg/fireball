import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

// store
import * as fromGuildsStore from '../../store';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromLoginStore from 'core/store/login';

import { ContentInner } from 'components/Content/ContentInner';

import { Guild } from '../../models';
import { GuildCard } from './components/GuildCard/GuildCard';
import { guildsPreviewStyles } from './styles';

export function GuildsPreview() {
  const classes = guildsPreviewStyles();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const connectedWallet: string | undefined | null = useAppSelector(fromLoginStore.getMetamaskLoggedAddress);
  const guilds: Guild[] = useAppSelector(fromGuildsStore.getGuilds);
  const getIsGuildsLoading: boolean = useAppSelector(fromGuildsStore.getIsGuildsLoading);

  useEffect(() => {
    dispatch(fromGuildsStore.onLoadGuilds());
  }, []);

  const onRedirectToCreateGuild = (): void => {
    navigate('create');
  };

  return (
    <ContentInner dataLoading={getIsGuildsLoading}>
      <div className={classes.guildsWrapper}>
        <ul className={classes.guildsList}>
          {guilds.map((guild: CustomAny, index: number) => (
            <GuildCard guild={guild} key={index} />
          ))}
        </ul>
        {connectedWallet && (
          <Button
            className={classes.guildCreate}
            variant='contained'
            size='large'
            onClick={() => onRedirectToCreateGuild()}
          >
            Create Guild
          </Button>
        )}
      </div>
    </ContentInner>
  );
}
