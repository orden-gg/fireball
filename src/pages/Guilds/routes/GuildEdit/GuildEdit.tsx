import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useMetamask } from 'use-metamask';

import * as fromGuildsStore from '../../store';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromLoginStore from 'core/store/login';

import { GuildFormValuesResult } from 'pages/Guilds/models';

import { ConnectWallet } from 'components/ConnectWallet/ConnectWallet';
import { ContentInner } from 'components/Content/ContentInner';

import { GuildForm } from '../GuildForm/GuildForm';

export function GuildEdit() {
  const { metaState } = useMetamask();
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const connectedWallet: string | undefined | null = useAppSelector(fromLoginStore.getMetamaskLoggedAddress);
  const editGuildData: GuildFormValuesResult = useAppSelector(fromGuildsStore.getEditGuildData);
  const isCurrentGuildLoading: boolean = useAppSelector(fromGuildsStore.getIsCurrentGuildLoading);
  const isCurrentGuildLoaded: boolean = useAppSelector(fromGuildsStore.getIsCurrentGuildLoaded);
  const isContractRequestInProgress: boolean = useAppSelector(fromGuildsStore.getIsContractRequestInProgress);

  useEffect(() => {
    if (!isCurrentGuildLoaded) {
      dispatch(fromGuildsStore.onLoadCurrentGuildById(params.id!));
    }
  }, []);

  const onHandleBackTo = (): void => {
    navigate(-1);
  };

  const onHandleSubmit = (values: GuildFormValuesResult): void => {
    dispatch(fromGuildsStore.onUpdateGuild(values));
  };

  return connectedWallet && metaState.isAvailable ? (
    <ContentInner dataLoading={isCurrentGuildLoading}>
      <GuildForm
        title='Edit Guild'
        formValues={editGuildData}
        primaryButtonText='Edit Guild'
        secondaryButtonText='Back to Guilds'
        isRequestInProgress={isContractRequestInProgress}
        onHandleBackTo={onHandleBackTo}
        onHandleSubmit={onHandleSubmit}
      />
    </ContentInner>
  ) : (
    <ConnectWallet />
  );
}
