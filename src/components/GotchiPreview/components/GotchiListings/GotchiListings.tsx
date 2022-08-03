import classNames from 'classnames';
import { DateTime } from 'luxon';

import { Erc1155Categories } from 'shared/constants';
import { SalesHistoryModel } from 'shared/models';
import { Subtitle } from 'components/Subtitle/Subtitle';
import { ItemCard } from 'components/ItemCard/containers';
import { CardImage } from 'components/ItemCard/components';
import { ItemUtils } from 'utils';

import { SalesHistory } from 'components/Previews/SalesHistory/SalesHistory';
import { HistoryHead, HistoryItem, HistoryPrice, HistoryRow } from 'components/Previews/SalesHistory/components';
import { gotchiPreviewStyles } from 'components/GotchiPreview/styles';
import { EthersApi } from 'api';

import { gotchiListingsStyles } from './styles';
import { EthAddress } from 'components/EthAddress/EthAddress';

interface GotchiListingsProps {
    historyLoaded: boolean;
    salesHistory: SalesHistoryModel[];
    className?: string;
}

export function GotchiListings({ salesHistory, historyLoaded, className }: GotchiListingsProps) {
    const classes = { ...gotchiListingsStyles(), ...gotchiPreviewStyles() };

    const convertTime = (time: string): string => {
        return DateTime.fromSeconds(parseInt(time)).toRelative() as string;
    };

    const renderWearables = (wearables: number[]): JSX.Element | JSX.Element[] => {
        const filtered = wearables.filter((id: number) => id !== 0);

        return filtered.length !== 0 ? (
            filtered.map((id: number, index: number) => {
                const rarity = ItemUtils.getItemRarityById(id);

                return <ItemCard type={rarity} className={classes.wearable} key={index}>
                    <CardImage className={classes.image} category={Erc1155Categories.Wearable} id={id} />
                </ItemCard>;
            })
        ) : (
            <>No wearables</>
        );
    };

    return (
        <SalesHistory historyLoaded={historyLoaded} className={classNames(classes.listings, className)}>
            <div className={classes.title}>
               <Subtitle className={classes.titleText} innerBg='background.default' variant='h4'>Sales History</Subtitle>
            </div>
            <HistoryHead className={classes.salesHeader}>
                <HistoryItem className={classes.address}>seller</HistoryItem>
                <HistoryItem className={classes.address}>buyer</HistoryItem>
                <HistoryItem className={classes.price}>price</HistoryItem>
                <HistoryItem className={classes.date}>time</HistoryItem>
                <HistoryItem className={classes.wearables}>wearables</HistoryItem>
            </HistoryHead>
            {salesHistory.map((listing, index) => (
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
                    <HistoryItem className={classes.date}>{convertTime(listing.timePurchased)}</HistoryItem>
                    <div className={classes.wearables}>{renderWearables(listing.equippedWearables)}</div>
                </HistoryRow>
            ))}
        </SalesHistory>
    );
}
