import * as fromGuildsStore from '../../../../store';
import { useAppSelector } from 'core/store/hooks';

import { GeneralGuildStats } from 'pages/Guilds/models';
import { GuildCard } from 'pages/Guilds/routes/GuildsPreview/components';

import { ContentInner } from 'components/Content/ContentInner';
import { EthAddress } from 'components/EthAddress/EthAddress';
import { GotchiSvg } from 'components/Gotchi/GotchiImage/GotchiSvg';
import {
  // AltarIcon,
  GotchiIcon,
  GotchiverseIcon,
  H1SealedPortalIcon, // TileIcon,
  // VoteIcon,
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
        <div>
          <div className={classes.guildInfoList}>
            {guildPlayersStats.map((stats: GeneralGuildStats, index: number) => (
              <GuildCard key={index}>
                <GuildCard.Top>
                  <GuildCard.Image>
                    {stats.bestGotchi ? (
                      <GotchiSvg className={classes.playerBestGotchi} id={stats.bestGotchi.id} size='100%' />
                    ) : (
                      <GotchiIcon className={classes.playerBestGotchi} width='100%' />
                    )}
                  </GuildCard.Image>
                  <GuildCard.Body>
                    <GuildCard.Name>{stats.bestGotchi ? stats.bestGotchi.name : `Member ${index + 1}`}</GuildCard.Name>

                    <GuildCard.AssetsList>
                      <GuildCard.Asset title='Gotchis' Icon={GotchiIcon} value={stats.gotchisCount} />
                      <GuildCard.Asset title='Wearables' Icon={WarehouseIcon} value={stats.itemsCount} />
                      <GuildCard.Asset title='Portals' Icon={H1SealedPortalIcon} value={stats.portalsCount} />
                      <GuildCard.Asset title='Realm' Icon={GotchiverseIcon} value={stats.realmCount} />
                      {/* <GuildCard.Asset title='Installations' Icon={AltarIcon} value={stats.installationsCount} />
                      <GuildCard.Asset title='Tiles' Icon={TileIcon} value={stats.tilesCount} />
                      <GuildCard.Asset title='Voting power' Icon={VoteIcon} value={stats.votingPower} /> */}
                    </GuildCard.AssetsList>
                  </GuildCard.Body>
                </GuildCard.Top>

                <GuildCard.Footer>
                  <EthAddress
                    address={stats.id!}
                    isShowIcon={true}
                    isClientLink={true}
                    isCopyButton={true}
                    isPolygonButton={true}
                  />
                </GuildCard.Footer>
              </GuildCard>
            ))}
          </div>
        </div>
      ) : (
        <div className={classes.guildInfoEmptyState}>There is no members info to display</div>
      )}
    </ContentInner>
  );
}
