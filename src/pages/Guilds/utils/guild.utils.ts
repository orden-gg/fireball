import { EthersApi } from 'api';

import { MAX_ITEMS_PER_QUERY } from 'shared/constants';

import { GuildPlayerRealmStats, GuildPlayerStats, GuildRealmStats, GuildStats } from '../models';

export class GuildUtils {
  public static mapPlayersStats(playersStats: GuildPlayerStats[]): GuildStats {
    return playersStats.reduce(
      (current: GuildStats, previous: GuildPlayerStats) => {
        return {
          gotchisCount: current.gotchisCount + previous.gotchisOriginalOwnedAmount,
          itemsCount: current.itemsCount + previous.itemsAmount,
          portalsCount: current.portalsCount + previous.portalsAmount,
          votingPower:
            current.votingPower +
            EthersApi.fromWei(previous.gotchisVP) +
            EthersApi.fromWei(previous.itemsVP) +
            EthersApi.fromWei(previous.portalsVP)
        };
      },
      {
        gotchisCount: 0,
        itemsCount: 0,
        portalsCount: 0,
        votingPower: 0
      }
    );
  }

  public static mapPlayersRealmStats(playersRealmStats: GuildPlayerRealmStats[]): GuildRealmStats {
    return playersRealmStats.reduce(
      (current: GuildRealmStats, previous: GuildPlayerRealmStats) => {
        return {
          realmCount: current.realmCount + previous.parcelsCount,
          installationsCount: current.installationsCount + previous.installationsCount,
          tilesCount: current.tilesCount + previous.tilesCount,
          votingPower: current.votingPower + EthersApi.fromWei(previous.parcelsVP)
        };
      },
      {
        realmCount: 0,
        installationsCount: 0,
        tilesCount: 0,
        votingPower: 0
      }
    );
  }

  public static getFirstAndSkipParamsByCount(itemsCount: number): { first: number; skip: number }[] {
    let skip: number = 0;
    const graphQueryParams: { first: number; skip: number }[] = [];

    if (itemsCount <= MAX_ITEMS_PER_QUERY) {
      graphQueryParams.push({ first: itemsCount, skip: 0 });
    } else {
      while (skip < itemsCount) {
        if (skip + MAX_ITEMS_PER_QUERY < itemsCount) {
          graphQueryParams.push({ first: MAX_ITEMS_PER_QUERY, skip });

          skip += MAX_ITEMS_PER_QUERY;
        } else {
          const remainingCount = itemsCount - skip;

          graphQueryParams.push({ first: remainingCount, skip });

          skip += MAX_ITEMS_PER_QUERY;
        }
      }
    }

    return graphQueryParams;
  }
}
