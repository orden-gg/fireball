import { ethers } from 'ethers';
import _ from 'lodash';

import { EthersApi } from './ethers.api';

import { TILES_CONTRACT, TileTypes } from 'shared/constants';
import { TilesBalances } from 'shared/models';

import TILES_ABI from 'data/abi/tiles.abi.json';

const tilesContract = EthersApi.makeContract(TILES_CONTRACT, TILES_ABI, 'polygon');

export class TilesApi {
  public static getTilesByAddress(address: string): Promise<TilesBalances[]> {
    return tilesContract.tilesBalances(address);
  }

  public static async craftTiles(ids: number[]): Promise<CustomAny> {
    const contractWithSigner: CustomAny = EthersApi.makeContractWithSigner(TILES_CONTRACT, TILES_ABI);
    const transaction: CustomAny = await contractWithSigner.craftTiles(ids);

    return EthersApi.waitForTransaction(transaction.hash, 'polygon').then((response: CustomAny) => {
      return Boolean(response.status);
    });
  }

  public static getAllTiles(): Promise<CustomAny> {
    return tilesContract
      .getTileTypes([])
      .then((response: CustomAny) => {
        const modified = _.cloneDeep(response);

        response.forEach(
          (tile: CustomAny, index: number) =>
            // ! Modify BigNumber`s => number`s
            (modified[index][TileTypes.AlchemicaCost] = tile.alchemicaCost.map((alchemica: CustomAny) => {
              return parseInt(ethers.utils.formatUnits(alchemica));
            }))
        );

        return modified;
      })
      .catch((error: CustomAny) => console.log(error));
  }
}
