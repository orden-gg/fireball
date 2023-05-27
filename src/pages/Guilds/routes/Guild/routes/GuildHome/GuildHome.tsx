import * as fromGuildsStore from '../../../../store';
import { useAppSelector } from 'core/store/hooks';

import { GeneralGuildStats } from 'pages/Guilds/models';
import { GuildAsset } from 'pages/Guilds/routes/GuildsPreview/components';

import { ContentInner } from 'components/Content/ContentInner';
import { EthAddress } from 'components/EthAddress/EthAddress';
import {
  AltarIcon,
  GotchiIcon,
  GotchiverseIcon,
  H1SealedPortalIcon,
  TileIcon,
  VoteIcon,
  WarehouseIcon
} from 'components/Icons/Icons';

import { guildHomeStyles } from './styles';

export function GuildHome(): JSX.Element {
  const classes = guildHomeStyles();

  const guildPlayersStats: GeneralGuildStats[] = useAppSelector(fromGuildsStore.getGuildPlayersStats);
  const isGuildStatsLoading: boolean = useAppSelector(fromGuildsStore.getIsGuildStatsLoading);

  return (
    <ContentInner dataLoading={isGuildStatsLoading} className={classes.guildInfoWrapper}>
      {guildPlayersStats.length > 0 ? (
        <div className={classes.guildInfoList}>
          {guildPlayersStats.map((info: GeneralGuildStats, index: number) => (
            <div className={classes.guildInfoListItem} key={index}>
              <div className={classes.guildInfoAddress}>
                <EthAddress
                  address={info.id!}
                  isShowIcon={true}
                  isClientLink={true}
                  isCopyButton={true}
                  isPolygonButton={true}
                />
              </div>
              <GuildAsset title='Gotchis' Icon={GotchiIcon} value={info.gotchisCount} />
              <GuildAsset title='Wearables' Icon={WarehouseIcon} value={info.itemsCount} />
              <GuildAsset title='Portals' Icon={H1SealedPortalIcon} value={info.portalsCount} />
              <GuildAsset title='Realm' Icon={GotchiverseIcon} value={info.realmCount} />
              <GuildAsset title='Installations' Icon={AltarIcon} value={info.installationsCount} />
              <GuildAsset title='Tiles' Icon={TileIcon} value={info.tilesCount} />
              <GuildAsset title='Voting power' Icon={VoteIcon} value={info.votingPower} />
            </div>
          ))}
        </div>
      ) : (
        <div className={classes.guildInfoEmptyState}>There is no members info to display</div>
      )}
    </ContentInner>
  );
}
