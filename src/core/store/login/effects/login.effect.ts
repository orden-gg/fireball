import { GuildsGraphCoreApi } from 'api';

import { AppThunk } from 'core/store/store';

import { LoginAddress, MemberGuild } from 'shared/models';

// slices
import * as loginSlices from '../slices/login.slice';

export const addAddress =
  ({ address, name }: LoginAddress): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const updatedAddresses = [{ name, address }, ...state.login.loggedAddresses];

    dispatch(loginSlices.setLoggedAddresses(updatedAddresses));

    localStorage.setItem('LOGGED_ADDRESSES', JSON.stringify(updatedAddresses));
  };

export const updateAddressName =
  (address: string, name: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const targetAddressIndex = state.login.loggedAddresses.findIndex(
      (loggedAddress) => loggedAddress.address === address
    );
    const loggedAddressesCopy = [...state.login.loggedAddresses];

    loggedAddressesCopy[targetAddressIndex] = { address, name };

    dispatch(loginSlices.setLoggedAddresses(loggedAddressesCopy));

    localStorage.setItem('LOGGED_ADDRESSES', JSON.stringify(loggedAddressesCopy));
  };

export const removeAddress =
  (address: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const filteredAddresses: LoginAddress[] = state.login.loggedAddresses.filter(
      (item: LoginAddress) => item.address !== address
    );

    dispatch(loginSlices.setLoggedAddresses(filteredAddresses));
    dispatch(selectActiveAddress(filteredAddresses.length ? filteredAddresses[0].address : ''));

    localStorage.setItem('LOGGED_ADDRESSES', JSON.stringify(filteredAddresses));
  };

export const selectActiveAddress =
  (address: string): AppThunk =>
  (dispatch) => {
    dispatch(loginSlices.setActiveAddress(address));

    localStorage.setItem('ACTIVE_ADDRESS', JSON.stringify(address));
  };

export const updateMetamaskLoggedAddress =
  (address: string): AppThunk =>
  (dispatch) => {
    dispatch(loginSlices.setMetamaskLoggedAddress(address));
  };

export const onLoadMemberGuildInfo =
  (address: string): AppThunk =>
  (dispatch) => {
    GuildsGraphCoreApi.getMemberById(address)
      .then((res: MemberGuild[]) => {
        const guildId: string | null = res[0] ? res[0].guild.id : null;

        dispatch(loginSlices.setMemberGuildId(guildId));
      })
      .catch((err) => console.log(err));
  };
