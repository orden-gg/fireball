import { useEffect } from 'react';

import * as fromGuildsStore from '../../../../store';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';

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

  const dispatch = useAppDispatch();

  const guildMembers: string[] = useAppSelector(fromGuildsStore.getCurrentGuildMembers);
  const guildHomeInfo: GeneralGuildStats[] = useAppSelector(fromGuildsStore.getGuildHomeInfo);
  const isGuildHomeInfoLoading: boolean = useAppSelector(fromGuildsStore.getIsGuildHomeInfoLoading);

  useEffect(() => {
    if (guildMembers.length > 0) {
      dispatch(fromGuildsStore.onLoadGuildHomeInfo(guildMembers));
    }
  }, [guildMembers]);

  return (
    <ContentInner dataLoading={isGuildHomeInfoLoading} className={classes.guildInfoWrapper}>
      {guildHomeInfo.length > 0 ? (
        <div className={classes.guildInfoList}>
          {guildHomeInfo.map((info: GeneralGuildStats, index: number) => (
            <div className={classes.guildInfoListItem} key={index}>
              <EthAddress
                address={info.id!}
                isShowIcon={true}
                isClientLink={true}
                isCopyButton={true}
                isPolygonButton={true}
              />
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
