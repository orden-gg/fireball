import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DateTime } from 'luxon';

import { Erc721Categories } from 'shared/constants';
import { SalesHistoryModel } from 'shared/models';
import { GotchiPreview } from 'components/GotchiPreview/GotchiPreview';
import { SalesHistory } from 'components/Previews/SalesHistory/SalesHistory';
import { HistoryHead, HistoryItem, HistoryPrice, HistoryRow, HistoryWearables } from 'components/Previews/SalesHistory/components';
import { EthAddress } from 'components/EthAddress/EthAddress';
import { EthersApi, TheGraphApi } from 'api';

import { styles } from './styles';

export function GotchiPage() {
    const classes = styles();

    const routeParams = useParams();

    const [gotchiLoaded, setGotchiLoaded] = useState<boolean>(false);
    const [gotchi, setGotchi] = useState<any>({});
    const [historyLoaded, setHistoryLoaded] = useState<boolean>(false);
    const [salesHistory, setSalesHistory] = useState<SalesHistoryModel[]>([]);

    useEffect(() => {
        const id = Number(routeParams.gotchiId);

        TheGraphApi.getGotchiById(id)
            .then((response: any) => setGotchi(response.data.aavegotchi))
            .catch((error) => console.log(error))
            .finally(() => setGotchiLoaded(true));

        TheGraphApi.getErc721SalesHistory(id, Erc721Categories.Aavegotchi)
            .then((response: SalesHistoryModel[]) => {
                setSalesHistory(response);
            })
            .catch((error) => console.log(error))
            .finally(() => setHistoryLoaded(true));
    }, [routeParams]);

    if (!gotchi) {
        return <div>There is no Gotchi with such ID :(</div>;
    }

    return <div className={classes.content}>
        {
            gotchiLoaded && (
                <>
                    <GotchiPreview gotchi={gotchi} />

                    {
                        gotchi.timesTraded > 0 && (
                            <SalesHistory historyLoaded={historyLoaded} className={classes.listings}>
                                <div className={classes.title}>Sales History</div>
                                <HistoryHead className={classes.salesHeader}>
                                    <HistoryItem className={classes.address}>seller</HistoryItem>
                                    <HistoryItem className={classes.address}>buyer</HistoryItem>
                                    <HistoryItem className={classes.price}>price</HistoryItem>
                                    <HistoryItem className={classes.date}>time</HistoryItem>
                                    <HistoryItem className={classes.wearables}>wearables</HistoryItem>
                                </HistoryHead>
                                {
                                    salesHistory.map((listing: SalesHistoryModel, index: number) => (
                                        <HistoryRow key={index}>
                                            <HistoryItem className={classes.address}>
                                                <EthAddress
                                                    address={listing.seller}
                                                    isShowIcon={true}
                                                    isCopyButton={true}
                                                    isPolygonButton={true}
                                                />
                                            </HistoryItem>
                                            <HistoryItem className={classes.address}>
                                                <EthAddress
                                                    address={listing.buyer}
                                                    isShowIcon={true}
                                                    isCopyButton={true}
                                                    isPolygonButton={true}
                                                />
                                            </HistoryItem>
                                            <HistoryPrice className={classes.price} price={EthersApi.fromWei(listing.priceInWei)} />
                                            <HistoryItem className={classes.date}>
                                                {DateTime.fromSeconds(parseInt(listing.timePurchased)).toRelative()}
                                            </HistoryItem>
                                            <HistoryWearables className={classes.wearables} wearables={listing.equippedWearables} />
                                        </HistoryRow>
                                    ))
                                }
                            </SalesHistory>
                        )
                    }
                </>
            )
        }
    </div>;
}
