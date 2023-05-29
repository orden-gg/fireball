import { CollateralData } from 'shared/models';

import { collaterals } from 'data/collaterals.data';
import { tokens } from 'data/tokens.data';

export class GraphUtils {
  public static calculateRewards(position: CustomAny, type: CustomAny): CustomAny {
    const BRSformula = { y: 0.94, k: 84857.04 };
    const KINformula = { y: 0.76, k: 9416.93 };
    const EXPformula = { y: 0.65, k: 2396.69 };

    if (position > 7500 || position === -1) {
      return { reward: 0 };
    }

    switch (type) {
      case 'BRS':
        return {
          name: type,
          position: position + 1,
          reward: +(Math.pow(1 / (position + 1), BRSformula.y) * BRSformula.k).toFixed(0)
        };
      case 'KIN':
        return {
          name: type,
          position: position + 1,
          reward: +(Math.pow(1 / (position + 1), KINformula.y) * KINformula.k).toFixed(0)
        };
      case 'EXP':
        return {
          name: type,
          position: position + 1,
          reward: +(Math.pow(1 / (position + 1), EXPformula.y) * EXPformula.k).toFixed(0)
        };
      default:
        return { reward: 0 };
    }
  }

  public static getCollateralName(address: CustomAny): CustomAny {
    const index = collaterals.findIndex((collateral: CollateralData) => collateral.address === address);

    return collaterals[index]?.name;
  }

  public static getCollateralImg(name: CustomAny): CustomAny {
    try {
      return require(`../assets/images/collaterals/${name.replace(/^.{2}/g, 'a')}.svg`).default;
    } catch (error) {
      return require('../assets/images/image-placeholder.svg').default;
    }
  }

  public static getTokenName(address: CustomAny): CustomAny {
    const index = tokens.findIndex((coll) => coll.address.toLowerCase() === address.toLowerCase());

    return tokens[index]?.name;
  }

  public static getTokenImg(name: CustomAny): CustomAny {
    try {
      return require(`../assets/images/tokens/${name}-token.svg`).default;
    } catch (error) {
      return require('../assets/images/image-placeholder.svg').default;
    }
  }

  public static getCombinedQueriesByIds(ids: number[], getQuery: (id: number) => string): string {
    const queries: string[] = ids.map((id: number) => getQuery(id));

    return `{${queries.join(',')}}`;
  }

  public static getQueriesByAddress(query: (address: string, skip: number) => string, address: string): string[] {
    const queries: string[] = [];

    for (let i = 0; i < 6; i++) {
      queries.push(query(address.toLowerCase(), i * 1000));
    }

    return queries;
  }

  public static flatGraphItems(responses: CustomAny[][], datasetRoute: CustomAny[]): CustomAny[] {
    const filteredArray: CustomAny[] = responses.flatMap((item: CustomAny) =>
      datasetRoute.reduce((acc, prop) => acc[prop], item.data)
    );

    return filteredArray;
  }
}
