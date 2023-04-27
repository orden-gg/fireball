import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface currentBlockState {
  isCurrentBlockLoaded: boolean;
  currentBlock: Undefinable<number | null>;
}
export const initialState: currentBlockState = {
  isCurrentBlockLoaded: false,
  currentBlock: null
};

export const currentBlockSlice = createSlice({
  name: 'currentBlock',
  initialState,
  reducers: {
    setIsCurrentBlockLoaded: (state, action: PayloadAction<boolean>) => {
      state.isCurrentBlockLoaded = action.payload;
    },
    setCurrentBlock: (state, action: PayloadAction<number>) => {
      state.currentBlock = action.payload;
    }
  }
});

export const { setIsCurrentBlockLoaded, setCurrentBlock } = currentBlockSlice.actions;

export const currentBlockReducers = currentBlockSlice.reducer;
