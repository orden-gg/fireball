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
                <HistoryItem>price</HistoryItem>
                <HistoryItem>time</HistoryItem>
                <HistoryItem className={classes.wearables}>wearables</HistoryItem>
            </HistoryHead>
            {salesHistory.map((listing, index) => (
                <HistoryRow key={index}>
                    <HistoryPrice price={EthersApi.fromWei(listing.priceInWei)} />
                    <HistoryItem>{convertTime(listing.timePurchased)}</HistoryItem>
                    <div className={classes.wearables}>{renderWearables(listing.equippedWearables)}</div>
                </HistoryRow>
            ))}
        </SalesHistory>
    );
}
