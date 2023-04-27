import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { currentBlockState } from '../slices';

export const currentBlockStateSelector = createSelector(
  (state: RootState) => state.currentBlock,
  (currentBlockState: currentBlockState) => currentBlockState
);

export const getIsCurrentBlockLoaded = createSelector(
  currentBlockStateSelector,
  (state: currentBlockState) => state.isCurrentBlockLoaded
);

export const getCurrentBlock = createSelector(
  currentBlockStateSelector,
  (state: currentBlockState) => state.currentBlock
);
