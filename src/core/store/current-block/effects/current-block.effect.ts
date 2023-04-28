import { EthersApi } from 'api';

import { AppThunk } from 'core/store/store';

import { Block } from 'shared/models';

import * as currentBlockSlices from '../slices/current-block.slice';

const fetchInterval: number = 30; // seconds

export const onLoadCurrentBlock = (): AppThunk => (dispatch) => {
  const getCurrentBlock = async function (): Promise<void> {
    dispatch(currentBlockSlices.setIsCurrentBlockLoaded(false));

    const currentBlock: Block = await EthersApi.getLastBlock().then((block) => {
      block.baseFeePerGas = Number(EthersApi.formatBigNumber(block.baseFeePerGas, 'gwei'));
      block.gasLimit = Number(EthersApi.formatBigNumber(block.gasLimit));
      block.gasUsed = Number(EthersApi.formatBigNumber(block.gasUsed));
      block._difficulty = Number(EthersApi.formatBigNumber(block._difficulty));

      return block;
    });

    dispatch(currentBlockSlices.setCurrentBlock(currentBlock));
    dispatch(currentBlockSlices.setIsCurrentBlockLoaded(true));
  };

  getCurrentBlock();

  setInterval(() => {
    getCurrentBlock();
  }, fetchInterval * 1000);
};
