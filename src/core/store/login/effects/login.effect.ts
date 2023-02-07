import { AppThunk } from 'core/store/store';
import { LoginAddress } from 'shared/models';

import { setActiveAddress, setLoggedAddresses } from '../slices/login.slice';

export const addAddress = ({ address, name }: LoginAddress): AppThunk => (dispatch, getState) => {
  const state = getState();
  const updatedAddresses = [{ name, address }, ...state.login.loggedAddresses];

  dispatch(setLoggedAddresses(updatedAddresses));

  localStorage.setItem('LOGGED_ADDRESSES', JSON.stringify(updatedAddresses));
};

export const updateAddressName = (address: string, name: string): AppThunk => (dispatch, getState) => {
  const state = getState();
  const targetAddressIndex = state.login.loggedAddresses.findIndex(loggedAddress => loggedAddress.address === address);
  const loggedAddressesCopy = [...state.login.loggedAddresses];

  loggedAddressesCopy[targetAddressIndex] = { address, name };

  dispatch(setLoggedAddresses(loggedAddressesCopy));

  localStorage.setItem('LOGGED_ADDRESSES', JSON.stringify(loggedAddressesCopy));
};

export const removeAddress = (address: string): AppThunk => (dispatch, getState) => {
  const state = getState();
  const filteredAddresses: LoginAddress[] = state.login.loggedAddresses.filter(
    (item: LoginAddress) => item.address !== address
  );

  dispatch(setLoggedAddresses(filteredAddresses));
  dispatch(selectActiveAddress(filteredAddresses.length ? filteredAddresses[0].address : ''));

  localStorage.setItem('LOGGED_ADDRESSES', JSON.stringify(filteredAddresses));
};

export const selectActiveAddress = (address: string): AppThunk => dispatch => {
  dispatch(setActiveAddress(address));

  localStorage.setItem('ACTIVE_ADDRESS', JSON.stringify(address));
};
