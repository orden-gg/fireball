import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ClientPortal } from 'pages/Client/models';

export interface PortalState {
  portal: {
    data: ClientPortal;
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  isInitialPortalLoading: boolean;
}

const initialState: PortalState = {
  portal: {
    data: {} as ClientPortal,
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  isInitialPortalLoading: true
};

export const portalSlice = createSlice({
  name: 'portal',
  initialState,
  reducers: {
    loadPortal: (state): void => {
      state.portal = {
        ...state.portal,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadPortalSucceded: (state, action: PayloadAction<ClientPortal>): void => {
      state.portal = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadPortalFailed: (state): void => {
      state.portal = {
        ...state.portal,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setIsInitialPortalLoading: (state, action: PayloadAction<boolean>): void => {
      state.isInitialPortalLoading = action.payload;
    }
  }
});

export const { loadPortal, loadPortalSucceded, loadPortalFailed, setIsInitialPortalLoading } =
  portalSlice.actions;

export const portalReducer = portalSlice.reducer;
