import { EthersApi } from 'api';

import { AppThunk } from 'core/store/store';

import { Block } from 'shared/models';

import * as currentBlockSlices from '../slices/current-block.slice';

const fetchInterval: number = 60; // seconds

export const onLoadCurrentBlock = (): AppThunk => (dispatch) => {
  const getCurrentBlock = async function (): Promise<void> {
    dispatch(currentBlockSlices.setIsCurrentBlockLoaded(false));

    const currentBlock: Block = await EthersApi.getLastBlock();

    dispatch(currentBlockSlices.setCurrentBlock(currentBlock.number));
    dispatch(currentBlockSlices.setIsCurrentBlockLoaded(true));
  };

  getCurrentBlock();

  setInterval(() => {
    getCurrentBlock();
  }, fetchInterval * 1000);
};
