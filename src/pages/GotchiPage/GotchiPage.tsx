import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

import { DateTime } from 'luxon';

import { EthersApi, TheGraphApi } from 'api';

import { useAppSelector } from 'core/store/hooks';
import { getActiveAddress } from 'core/store/login';

import { Erc721Categories } from 'shared/constants';
import {
  FireballErc1155Item,
  FireballGotchi,
  Gotchi,
  GotchiExtended,
  IdentityOption,
  SalesHistoryModel
} from 'shared/models';

import { EthAddress } from 'components/EthAddress/EthAddress';
import { GotchiAging } from 'components/Gotchi/GotchiAging/GotchiAging';
import { GotchiInventory } from 'components/GotchiInventory/GotchiInventory';
import { GotchiPreview } from 'components/GotchiPreview/GotchiPreview';
import {
  GotchiContent,
  GotchiFooter,
  GotchiHead,
  GotchiInfoItem,
  GotchiInfoList,
  GotchiPreviewIdentity,
  GotchiTraits,
  GotchiView
} from 'components/GotchiPreview/components';
import { GhstTokenIcon } from 'components/Icons/Icons';
import { SalesHistory } from 'components/Previews/SalesHistory/SalesHistory';
import {
  HistoryHead,
  HistoryItem,
  HistoryPrice,
  HistoryRow,
  HistoryWearables
} from 'components/Previews/SalesHistory/components';
import { ViewInAppButton } from 'components/ViewInAppButton/ViewInAppButton';

import { GotchiUtils } from 'utils';

import { GotchiFitSets } from './components/GotchiFitSets/GotchiFitSets';
import { GotchiFitWearables } from './components/GotchiFitWearables/GotchiFitWearable';
import { styles } from './styles';

export function GotchiPage() {
  const classes = styles();

  const routeParams = useParams();

  const activeAddress = useAppSelector(getActiveAddress);

  const [gotchiLoaded, setGotchiLoaded] = useState<boolean>(false);
  const [gotchi, setGotchi] = useState<GotchiExtended | null>(null);
  const [historyLoaded, setHistoryLoaded] = useState<boolean>(false);
  const [salesHistory, setSalesHistory] = useState<SalesHistoryModel[]>([]);
  const [gotchiInventory, setGotchiInventory] = useState<number[]>([]);
  const [playerInventory, setPlayerInventory] = useState<FireballErc1155Item[]>([]);

  const [claimedGotchis, setClaimedGotchis] = useState<Gotchi[]>([]);
  const [unclaimedGotchiIds, setUnclaimedGotchiIds] = useState<number[]>([]);
  const [gotchisLoaded, setGotchisLoaded] = useState<boolean>(false);

  useEffect(() => {
    const id: number = Number(routeParams.gotchiId);
    const promises: [Promise<Gotchi>, Promise<FireballGotchi>] = [
      TheGraphApi.getGotchiById(id),
      TheGraphApi.getFireballGotchiById(id)
    ];

    Promise.all(promises)
      .then(async ([gotchi, fireballGotchi]: [Gotchi, FireballGotchi]) => {
        const extendedGotchi: GotchiExtended = { ...gotchi, ...fireballGotchi };
        const sortedInventory: number[] = gotchi.equippedWearables
          .concat(fireballGotchi.badges)
          .filter((id: number) => id !== 0);

        setGotchi(extendedGotchi);
        setGotchiInventory(sortedInventory);
        setGotchiLoaded(true);
      })
      .catch((error) => console.log(error));

    TheGraphApi.getErc721SalesHistory(id, Erc721Categories.Aavegotchi)
      .then((response: SalesHistoryModel[]) => {
        setSalesHistory(response);
      })
      .catch((error) => console.log(error))
      .finally(() => setHistoryLoaded(true));
  }, [routeParams]);

  useEffect(() => {
    if (activeAddress) {
      TheGraphApi.getIventoryByAddress(activeAddress)
        .then((inventory: FireballErc1155Item[]) => {
          setPlayerInventory(inventory);
        })
        .catch((error) => console.log(error));
    }
  }, [activeAddress]);

  useEffect(() => {
    if (gotchi) {
      const claimedGotchiIds: number[] = gotchi.identity.claimed.map((identityGotchi: IdentityOption) =>
        Number(identityGotchi.gotchiId)
      );
      const unclaimedGotchiIds: number[] = gotchi.identity.unclaimed.map((identityGotchi: IdentityOption) =>
        Number(identityGotchi.gotchiId)
      );
      let isMounted: boolean = true;

      if (claimedGotchiIds.length > 0) {
        TheGraphApi.getGotchiesByIds(claimedGotchiIds)
          .then((claimedGotchis: Gotchi[]) => {
            if (isMounted) {
              setClaimedGotchis(Object.values(claimedGotchis));
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            if (isMounted) {
              setGotchisLoaded(true);
            }
          });
      } else {
        setGotchisLoaded(true);
      }

      setUnclaimedGotchiIds(unclaimedGotchiIds);

      return () => {
        isMounted = false;
      };
    }
  }, [gotchi]);

  return (
    <div className={classes.content}>
      {gotchiLoaded ? (
        gotchi ? (
          <>
            <GotchiPreview>
              <GotchiView gotchi={gotchi} />
              <GotchiContent>
                <GotchiHead name={gotchi.name || 'Unnamed'} owner={gotchi.originalOwner?.id || gotchi.owner.id} />

                <GotchiInfoList>
                  <GotchiInfoItem label='id' value={gotchi.id} />
                  <GotchiInfoItem label='kinship' value={gotchi.kinship} />
                  <GotchiInfoItem label='haunt' value={gotchi.hauntId} />
                  <GotchiInfoItem
                    label='staked'
                    value={parseFloat(
                      GotchiUtils.getStakedAmount(gotchi.collateral, gotchi.stakedAmount).toPrecision(5)
                    )}
                  />
                </GotchiInfoList>

                <GotchiTraits
                  numericTraits={gotchi.numericTraits}
                  modifiedNumericTraits={gotchi.modifiedNumericTraits}
                />

                <div className={classes.gotchiGroup}>
                  {gotchi.createdAt && <GotchiAging block={Number(gotchi.createdAt)} />}
                  <GotchiPreviewIdentity
                    gotchisLoaded={gotchisLoaded}
                    claimedGotchis={claimedGotchis}
                    unclaimedGotchiIds={unclaimedGotchiIds}
                  />
                </div>

                <GotchiFooter>
                  <ViewInAppButton link={`https://app.aavegotchi.com/gotchi/${gotchi.id}`} className={classes.button}>
                    View at aavegotchi.com
                  </ViewInAppButton>
                  {gotchi.listings?.length ? (
                    <ViewInAppButton
                      link={`https://app.aavegotchi.com/baazaar/erc721/${gotchi.listings[0].id}`}
                      className={classes.button}
                    >
                      <>
                        Listed for {EthersApi.fromWei(gotchi.listings[0].priceInWei)}
                        <GhstTokenIcon width={14} height={14} className={classes.listingIcon} />
                      </>
                    </ViewInAppButton>
                  ) : (
                    <></>
                  )}
                </GotchiFooter>
              </GotchiContent>
            </GotchiPreview>
            {gotchiInventory.length > 0 ? (
              <div className={classes.inventory}>
                <div className={classes.title}>Inventory</div>
                <GotchiInventory items={gotchiInventory} />
              </div>
            ) : (
              <></>
            )}
            {Number(gotchi.timesTraded) > 0 && (
              <SalesHistory historyLoaded={historyLoaded} className={classes.listings}>
                <div className={classes.title}>Sales History</div>
                <HistoryHead className={classes.salesHeader}>
                  <HistoryItem className={classes.address}>seller</HistoryItem>
                  <HistoryItem className={classes.address}>buyer</HistoryItem>
                  <HistoryItem className={classes.price}>price</HistoryItem>
                  <HistoryItem className={classes.date}>time</HistoryItem>
                  <HistoryItem className={classes.wearables}>wearables</HistoryItem>
                </HistoryHead>
                <>
                  {salesHistory.map((listing: SalesHistoryModel, index: number) => (
                    <HistoryRow key={index}>
                      <HistoryItem className={classes.address}>
                        <EthAddress address={listing.seller} isShowIcon isCopyButton isPolygonButton isClientLink />
                      </HistoryItem>
                      <HistoryItem className={classes.address}>
                        <EthAddress address={listing.buyer} isShowIcon isCopyButton isPolygonButton isClientLink />
                      </HistoryItem>
                      <HistoryPrice className={classes.price} price={EthersApi.fromWei(listing.priceInWei)} />
                      <HistoryItem className={classes.date}>
                        <>{DateTime.fromSeconds(parseInt(listing.timePurchased)).toRelative()}</>
                      </HistoryItem>
                      <HistoryWearables className={classes.wearables} wearables={listing.equippedWearables} />
                    </HistoryRow>
                  ))}
                </>
              </SalesHistory>
            )}
            <div className={classes.sets}>
              <div className={classes.title}>Recommended sets</div>
              <GotchiFitSets
                hauntId={gotchi.hauntId}
                collateral={gotchi.collateral}
                numericTraits={gotchi.numericTraits}
                className={classes.setsList}
              />
            </div>
            <div className={classes.sets}>
              <div className={classes.title}>Recommended wearables</div>
              <GotchiFitWearables traits={gotchi.numericTraits} inventory={playerInventory} />
            </div>
          </>
        ) : (
          <div className={classes.title}>There is no Gotchi with such ID :(</div>
        )
      ) : (
        <div className={classes.title}>
          <CircularProgress size={40} className={classes.progress} />
        </div>
      )}
    </div>
  );
}
