import { useEffect, useState } from 'react';

import { CircularProgress } from '@mui/material';

import classNames from 'classnames';
import { DateTime } from 'luxon';

import { EthersApi, TheGraphApi } from 'api';

import { Erc721Categories } from 'shared/constants';
import { FireballGotchi, Gotchi, GotchiExtended, IdentityOption, SalesHistoryModel } from 'shared/models';

import { EthAddress } from 'components/EthAddress/EthAddress';
import { GotchiInventory } from 'components/GotchiInventory/GotchiInventory';
import { GotchiPreview } from 'components/GotchiPreview/GotchiPreview';
import {
  GotchiContent,
  GotchiFooter,
  GotchiHead,
  GotchiInfoItem,
  GotchiInfoList,
  GotchiTraits,
  GotchiView,
  IdentityList
} from 'components/GotchiPreview/components';
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

import { gotchiPreviewModalStyles } from './styles';

export function GotchiPreviewModal({ id, gotchi }: { id: number; gotchi?: GotchiExtended }) {
  const classes = gotchiPreviewModalStyles();

  const [modalGotchi, setModalGotchi] = useState<GotchiExtended | null>(null);
  const [isGotchiLoading, setIsGotchiLoading] = useState<boolean>(true);
  const [historyLoaded, setHistoryLoaded] = useState<boolean>(false);
  const [salesHistory, setSalesHistory] = useState<SalesHistoryModel[]>([]);
  const [gotchiInventory, setGotchiInventory] = useState<number[]>([]);

  const [claimedGotchis, setClaimedGotchis] = useState<Gotchi[]>([]);
  const [unclaimedGotchiIds, setUnclaimedGotchiIds] = useState<number[]>([]);
  const [gotchisLoaded, setGotchisLoaded] = useState<boolean>(false);

  useEffect(() => {
    let isMounted: boolean = true;

    if (gotchi) {
      setModalGotchi(gotchi);
      setGotchiInventory([]);
      setSalesHistory([]);
      setIsGotchiLoading(false);
    } else {
      const responses: [Promise<Gotchi>, Promise<FireballGotchi>] = [
        TheGraphApi.getGotchiById(id),
        TheGraphApi.getFireballGotchiById(id)
      ];

      Promise.all(responses)
        .then(([gotchi, fireballGotchis]: [Gotchi, FireballGotchi]) => {
          if (isMounted) {
            const extendedGotchi: GotchiExtended = { ...gotchi, ...fireballGotchis };
            const sortedInventory: number[] = gotchi.equippedWearables
              .concat(fireballGotchis.badges)
              .filter((id: number) => id !== 0);

            setGotchiInventory(sortedInventory);
            setModalGotchi(extendedGotchi);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => isMounted && setIsGotchiLoading(false));

      TheGraphApi.getErc721SalesHistory(id, Erc721Categories.Aavegotchi)
        .then((response: SalesHistoryModel[]) => {
          if (isMounted) {
            setSalesHistory(response);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => isMounted && setHistoryLoaded(true));
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (modalGotchi) {
      const claimedGotchiIds: number[] = modalGotchi.identity.claimed.map((identityGotchi: IdentityOption) =>
        Number(identityGotchi.gotchiId)
      );
      const unclaimedGotchiIds: number[] = modalGotchi.identity.unclaimed.map((identityGotchi: IdentityOption) =>
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
  }, [modalGotchi]);

  return (
    <div className={classNames(classes.previewModal, (isGotchiLoading || !modalGotchi) && 'emptyState')}>
      {!isGotchiLoading ? (
        modalGotchi ? (
          <>
            <GotchiPreview>
              <GotchiView gotchi={modalGotchi} />
              <GotchiContent>
                <GotchiHead
                  name={modalGotchi.name || 'Unnamed'}
                  owner={modalGotchi.originalOwner?.id || modalGotchi.owner?.id}
                />

                <GotchiInfoList>
                  <GotchiInfoItem label='id' value={modalGotchi.id} />
                  <GotchiInfoItem label='kinship' value={modalGotchi.kinship} />
                  <GotchiInfoItem label='haunt' value={modalGotchi.hauntId} />
                  <GotchiInfoItem
                    label='staked'
                    value={parseFloat(
                      GotchiUtils.getStakedAmount(modalGotchi.collateral, modalGotchi.stakedAmount).toPrecision(5)
                    )}
                  />
                  <GotchiInfoItem
                    label='identity'
                    value={`1/${modalGotchi.identity.claimed.length}`}
                    title={
                      gotchisLoaded ? (
                        <div>
                          <IdentityList gotchis={claimedGotchis} title='summoned' />
                          {unclaimedGotchiIds.length > 0 ? (
                            <IdentityList gotchis={unclaimedGotchiIds} title='in portal' />
                          ) : (
                            <></>
                          )}
                        </div>
                      ) : (
                        <CircularProgress size={20} />
                      )
                    }
                  />
                </GotchiInfoList>

                <GotchiTraits
                  numericTraits={modalGotchi.numericTraits}
                  modifiedNumericTraits={modalGotchi.modifiedNumericTraits}
                />

                {modalGotchi.originalOwner?.id || modalGotchi.owner?.id ? (
                  <GotchiFooter>
                    <ViewInAppButton link={`/gotchi/${modalGotchi.id}`} className={classes.button} target='_self'>
                      FULL INFORMATION
                    </ViewInAppButton>
                    <ViewInAppButton
                      link={`https://app.aavegotchi.com/gotchi/${modalGotchi.id}`}
                      className={classes.button}
                    >
                      View at aavegotchi.com
                    </ViewInAppButton>
                  </GotchiFooter>
                ) : (
                  <></>
                )}
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
            {Number(modalGotchi?.timesTraded) > 0 && (
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
          </>
        ) : (
          <div className={classes.title}>There is no Gotchi with such ID :(</div>
        )
      ) : (
        <CircularProgress color='primary' />
      )}
    </div>
  );
}
