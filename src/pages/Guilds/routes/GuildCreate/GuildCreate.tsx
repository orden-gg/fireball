import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMetamask } from 'use-metamask';

import * as fromGuildsStore from '../../store';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromLoginStore from 'core/store/login';

import { initialValues } from 'pages/Guilds/data';
import { GuildFormValuesResult } from 'pages/Guilds/models';

import { ConnectWallet } from 'components/ConnectWallet/ConnectWallet';

import { GuildForm } from '../GuildForm/GuildForm';

export function GuildCreate() {
  const { metaState } = useMetamask();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const connectedWallet: string | undefined | null = useAppSelector(fromLoginStore.getMetamaskLoggedAddress);
  const isContractRequestInProgress: boolean = useAppSelector(fromGuildsStore.getIsContractRequestInProgress);
  const isGuildCreationSucceeded: boolean = useAppSelector(fromGuildsStore.getIsGuildCreationSucceeded);

  useEffect(() => {
    if (isGuildCreationSucceeded) {
      navigate(-1);
    }
  }, [isGuildCreationSucceeded]);

  const onHandleBackTo = (): void => {
    navigate(-1);
  };

  const onHandleSubmit = (values: GuildFormValuesResult): void => {
    dispatch(fromGuildsStore.onCreateGuild(values));
  };

  return connectedWallet && metaState.isAvailable ? (
    <GuildForm
      title='Create Guild'
      formValues={initialValues}
      primaryButtonText='Create Guild'
      secondaryButtonText='Back to Guilds'
      isRequestInProgress={isContractRequestInProgress}
      onHandleBackTo={onHandleBackTo}
      onHandleSubmit={onHandleSubmit}
    />
  ) : (
    <ConnectWallet />
  );
}
