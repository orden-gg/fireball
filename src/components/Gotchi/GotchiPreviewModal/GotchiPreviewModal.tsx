import { useEffect, useState } from 'react';

import { DateTime } from 'luxon';

import { Erc721Categories } from 'shared/constants';
import { GotchiInventoryModel, GotchiModel, SalesHistoryModel } from 'shared/models';
import { GotchiPreview } from 'components/GotchiPreview/GotchiPreview';
import { GotchiContent, GotchiFooter, GotchiHead, GotchiInfoItem, GotchiInfoList, GotchiTraits, GotchiView } from 'components/GotchiPreview/components';
import { ViewInAppButton } from 'components/ViewInAppButton/ViewInAppButton';
import { GotchiInventory } from 'components/GotchiInventory/GotchiInventory';
import { SalesHistory } from 'components/Previews/SalesHistory/SalesHistory';
import { HistoryHead, HistoryItem, HistoryPrice, HistoryRow, HistoryWearables } from 'components/Previews/SalesHistory/components';
import { EthAddress } from 'components/EthAddress/EthAddress';
import { EthersApi, MainApi, TheGraphApi } from 'api';
import { GotchiUtils, ItemUtils } from 'utils';

import { gotchiPreviewModalStyles } from './styles';

export function GotchiPreviewModal({ gotchi }: { gotchi: any }) {
    const classes = gotchiPreviewModalStyles();

    const [historyLoaded, setHistoryLoaded] = useState<boolean>(false);
    const [salesHistory, setSalesHistory] = useState<SalesHistoryModel[]>([]);
    const [inventory, setInventory] = useState<GotchiInventoryModel[]>([]);

    useEffect(() => {
        const id: number = Number(gotchi.id);

        MainApi.getAavegotchiById(id).then((response: any[]) => {
            const gotchi: GotchiModel = GotchiUtils.convertDataFromContract(response);
            const sortedInventory: GotchiInventoryModel[] = [...gotchi.inventory].sort((item: GotchiInventoryModel) => {
                const slot: string[] = ItemUtils.getSlotsById(item.id);

                return slot.length > 0 ? -1 : 1;
            });

            setInventory(sortedInventory);
        });

        TheGraphApi.getErc721SalesHistory(id, Erc721Categories.Aavegotchi)
            .then((response: SalesHistoryModel[]) => {
                setSalesHistory(response);
            })
            .catch((error) => console.log(error))
            .finally(() => setHistoryLoaded(true));
    }, [gotchi.id]);

    return <div className={classes.previewModal}>
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
                        value={
                            parseFloat(GotchiUtils.getStakedAmount(gotchi.collateral, gotchi.stakedAmount).toPrecision(5))
                        }
                    />
                </GotchiInfoList>

                <GotchiTraits
                    numericTraits={gotchi.numericTraits}
                    modifiedNumericTraits={gotchi.modifiedNumericTraits}
                />

                <GotchiFooter>
                    <ViewInAppButton link={`/gotchi/${gotchi.id}`} className={classes.button}>MORE INFO</ViewInAppButton>
                    <ViewInAppButton link={`https://app.aavegotchi.com/gotchi/${gotchi.id}`} className={classes.button}>View at aavegotchi.com</ViewInAppButton>
                </GotchiFooter>
            </GotchiContent>
        </GotchiPreview>
        {
            inventory.length > 0 ? (
                <div className={classes.inventory}>
                    <div className={classes.title}>Inventory</div>
                    <GotchiInventory items={inventory} />
                </div>
            ) : <></>
        }
        {gotchi.timesTraded > 0 && (
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
                                <EthAddress
                                    address={listing.seller}
                                    isShowIcon
                                    isCopyButton
                                    isPolygonButton
                                    isClientLink
                                />
                            </HistoryItem>
                            <HistoryItem className={classes.address}>
                                <EthAddress
                                    address={listing.buyer}
                                    isShowIcon
                                    isCopyButton
                                    isPolygonButton
                                    isClientLink
                                />
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
    </div>;
}
