import { RootState } from 'core/store/store';

export const getIsDropdownOpen = (state: RootState) => state.login.isDropdownOpen;
export const getActiveAddress = (state: RootState) => state.login.activeAddress;
export const getLoggedAddress = (state: RootState) => state.login.loggedAddresses;
