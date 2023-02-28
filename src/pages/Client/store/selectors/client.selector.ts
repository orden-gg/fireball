import { RootState } from 'core/store/store';

export const getIsClientDataLoaded = (state: RootState): boolean => {
  const isLoaded: boolean = state.client.lentGotchis.lentGotchis.isLoaded;

  return isLoaded;
};
