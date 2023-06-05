import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ClientForgeState {
  forge: {
    data: CustomAny;
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  isInitialForgeLoading: boolean;
}

const initialState: ClientForgeState = {
  forge: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  isInitialForgeLoading: true
};

export const forgeSlice = createSlice({
  name: 'forge',
  initialState,
  reducers: {
    loadForgeItems: (state): void => {
      state.forge = {
        ...state.forge,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadForgeItemsSucceded: (state, action: PayloadAction<CustomAny>): void => {
      state.forge = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadForgeItemsFailed: (state): void => {
      state.forge = {
        ...state.forge,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setIsInitialForgeLoading: (state, action: PayloadAction<boolean>): void => {
      state.isInitialForgeLoading = action.payload;
    },
    resetForgeItems: (state): void => {
      state.forge = {
        data: null,
        isLoading: false,
        isLoaded: false,
        isError: false
      };
    }
  }
});

export const {
  loadForgeItems,
  loadForgeItemsSucceded,
  loadForgeItemsFailed,
  setIsInitialForgeLoading,
  resetForgeItems
} = forgeSlice.actions;

export const forgeReducer = forgeSlice.reducer;
