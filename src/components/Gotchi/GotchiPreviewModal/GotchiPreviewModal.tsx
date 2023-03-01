import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

import classNames from 'classnames';
import { DateTime } from 'luxon';

import { Erc721Categories } from 'shared/constants';
import { GotchiInventory as GotchiInventoryModel, Gotchi, SalesHistoryModel } from 'shared/models';
import { GotchiPreview } from 'components/GotchiPreview/GotchiPreview';
import {
  GotchiContent,
  GotchiFooter,
  GotchiHead,
  GotchiInfoItem,
  GotchiInfoList,
  GotchiTraits,
  GotchiView
} from 'components/GotchiPreview/components';
import { ViewInAppButton } from 'components/ViewInAppButton/ViewInAppButton';
import { GotchiInventory } from 'components/GotchiInventory/GotchiInventory';
import { SalesHistory } from 'components/Previews/SalesHistory/SalesHistory';
import {
  HistoryHead,
  HistoryItem,
  HistoryPrice,
  HistoryRow,
  HistoryWearables
} from 'components/Previews/SalesHistory/components';
import { EthAddress } from 'components/EthAddress/EthAddress';
import { EthersApi, MainApi, TheGraphApi } from 'api';
import { GotchiUtils, ItemUtils } from 'utils';

import { gotchiPreviewModalStyles } from './styles';

export function GotchiPreviewModal({ id, gotchi }: { id: number; gotchi?: any }) {
  const classes = gotchiPreviewModalStyles();

  const [modalGotchi, setModalGotchi] = useState<any>(null);
  const [isGotchiLoading, setIsGotchiLoading] = useState<boolean>(true);
  const [historyLoaded, setHistoryLoaded] = useState<boolean>(false);
  const [salesHistory, setSalesHistory] = useState<SalesHistoryModel[]>([]);
  const [inventory, setInventory] = useState<GotchiInventoryModel[]>([]);

  useEffect(() => {
    if (gotchi) {
      setModalGotchi(gotchi);
      setInventory([]);
      setSalesHistory([]);
      setIsGotchiLoading(false);
    } else {
      MainApi.getAavegotchiById(id)
        .then((response: any[]) => {
          const gotchi: Gotchi = GotchiUtils.convertDataFromContract(response);
          const sortedInventory: GotchiInventoryModel[] = [...gotchi.inventory].sort((item: GotchiInventoryModel) => {
            const slot: string[] = ItemUtils.getSlotsById(item.id);

            return slot.length > 0 ? -1 : 1;
          });

          setInventory(sortedInventory);
        })
        .catch((error) => console.log(error));

      TheGraphApi.getGotchiById(id)
        .then((response: any) => setModalGotchi(response))
        .catch((error) => console.log(error))
        .finally(() => setIsGotchiLoading(false));

      TheGraphApi.getErc721SalesHistory(id, Erc721Categories.Aavegotchi)
        .then((response: SalesHistoryModel[]) => {
          setSalesHistory(response);
        })
        .catch((error) => console.log(error))
        .finally(() => setHistoryLoaded(true));
    }
  }, []);

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
                      GotchiUtils.getStakedAmount(
                        modalGotchi.collateral,
                        modalGotchi.stakedAmount ? modalGotchi.stakedAmount : 0
                      ).toPrecision(5)
                    )}
                  />
                </GotchiInfoList>

                <GotchiTraits
                  numericTraits={modalGotchi.numericTraits}
                  modifiedNumericTraits={modalGotchi.modifiedNumericTraits}
                />

                {(modalGotchi.originalOwner?.id || modalGotchi.owner?.id) && (
                  <GotchiFooter>
                    <ViewInAppButton link={`/gotchi/${modalGotchi.id}`} className={classes.button}>
                      MORE INFO
                    </ViewInAppButton>
                    <ViewInAppButton
                      link={`https://app.aavegotchi.com/gotchi-/${modalGotchi.id}`}
                      className={classes.button}
                    >
                      View at aavegotchi.com
                    </ViewInAppButton>
                  </GotchiFooter>
                )}
              </GotchiContent>
            </GotchiPreview>
            {inventory.length > 0 ? (
              <div className={classes.inventory}>
                <div className={classes.title}>Inventory</div>
                <GotchiInventory items={inventory} />
              </div>
            ) : (
              <></>
            )}
            {modalGotchi?.timesTraded > 0 && (
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
