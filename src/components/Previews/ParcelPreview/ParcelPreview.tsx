import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';

import { DateTime } from 'luxon';
import classNames from 'classnames';

import { Erc1155Categories } from 'shared/constants';
import { ParcelAlchemica } from 'shared/models';
import { ActiveListingButton } from 'components/ActiveListingButton/ActiveListingButton';
import { EthAddress } from 'components/EthAddress/EthAddress';
import { ParcelImage } from 'components/Items/ParcelImage/ParcelImage';
import { ParcelInstallations } from 'components/Items/ParcelInstallations/ParcelInstallations';
import { EthersApi, TheGraphApi } from 'api';
import { CitadelUtils, GotchiverseUtils } from 'utils';

import { SalesHistory } from '../SalesHistory/SalesHistory';
import { HistoryItem, HistoryHead, HistoryPrice, HistoryRow } from '../SalesHistory/components';

import { styles } from './styles';

export function ParcelPreview({ parcel }: { parcel: any; alchemica?: ParcelAlchemica }) {
    const classes = styles();

    const [history, setHistory] = useState<any[]>([]);
    const [historyLoaded, setHistoryLoaded] = useState<boolean>(false);
    // const [isSurveyed, setIsSurveyed] = useState<boolean>(false);

    const boosts: Array<{ name: string; value: any }> = [
        { name: 'fud', value: parcel.fudBoost },
        { name: 'fomo', value: parcel.fomoBoost },
        { name: 'alpha', value: parcel.alphaBoost },
        { name: 'kek', value: parcel.kekBoost }
    ];

    useEffect(() => {
        let mounted = true;

        TheGraphApi.getErc721SalesHistory(Number(parcel.tokenId), Erc1155Categories.Installation)
            .then((res: any) => {
                if (mounted) {
                    setHistory(res);
                }
            })
            .catch((err) => console.log(err))
            .finally(() => {
                if (mounted) {
                    setHistoryLoaded(true);
                }
            });

        return () => {
            mounted = false;
        };
    }, [parcel.tokenId]);

    // useEffect(() => {
    //     setIsSurveyed(alchemica !== undefined && !CommonUtils.isEmptyObject(alchemica));
    // }, [alchemica]);

    const modifyName = (hash: string) => {
        return hash.replace(/-/g, ' ');
    };

    return (
        <div className={classes.container}>
            <div className={classes.inner}>
                <div className={classes.image}>
                    <ParcelImage parcel={parcel} imageSize={300} />
                </div>

                <div className={classes.content}>
                    <div>
                        <div className={classes.contentTop}>
                            <h5 className={classes.name}>{modifyName(parcel.parcelHash)}</h5>
                            <EthAddress
                                address={parcel.owner?.id}
                                isShowIcon={true}
                                isClientLink={true}
                                isPolygonButton={true}
                                isCopyButton={true}
                            />
                        </div>

                        <div className={classes.badges}>
                            <Paper className={classes.badge} elevation={0}>
                                <span className={classes.highlighted}>id:</span>
                                {parcel.tokenId}
                            </Paper>
                            <Paper className={classes.badge} elevation={0}>
                                <span className={classes.highlighted}>district:</span>
                                {parcel.district}
                            </Paper>
                            <Paper className={classes.badge} elevation={0}>
                                <span className={classes.highlighted}>size:</span>
                                {CitadelUtils.getParcelSizeName(parcel.size)}(
                                {CitadelUtils.getParcelDimmentions(parcel.size)})
                            </Paper>
                        </div>

                        <div className={classes.boosts}>
                            {boosts.map((boost, i) => {
                                const multiplierValue = GotchiverseUtils.getAlchemicaMultiplier(boost.name);
                                const totalBoost = boost.value * multiplierValue;

                                return boost.value > 0 ? (
                                    <div className={classNames(classes.boost, boost.name)} key={i}>
                                        <img
                                            src={GotchiverseUtils.getAlchemicaTokenImg(boost.name)}
                                            alt={boost.name}
                                            width={32}
                                        />
                                        <div>
                                            <h5>{totalBoost}</h5>
                                            <p>
                                                {boost.value}pts x {multiplierValue}
                                            </p>
                                        </div>
                                    </div>
                                ) : null;
                            })}
                        </div>

                        {parcel.installations?.length > 0 && (
                            <div className={classes.installations}>
                                <ParcelInstallations parcel={parcel} size={80} />
                            </div>
                        )}

                        <div className={classes.survey}>
                            <h5 className={classes.surveyTitle}>Survey</h5>
                            {/* {isSurveyed ? (
                                <div>
                                    <div>
                                        <span>{[AlchemicaTypes.Fud]}:</span>
                                        <span>{alchemica[AlchemicaTypes.Fud]}</span>
                                    </div>
                                    <div>
                                        <span>{[AlchemicaTypes.Fomo]}:</span>
                                        <span>{alchemica[AlchemicaTypes.Fomo]}</span>
                                    </div>
                                    <div>
                                        <span>{[AlchemicaTypes.Alpha]}:</span>
                                        <span>{alchemica[AlchemicaTypes.Alpha]}</span>
                                    </div>
                                    <div>
                                        <span>{[AlchemicaTypes.Kek]}:</span>
                                        <span>{alchemica[AlchemicaTypes.Kek]}</span>
                                    </div>
                                </div>
                            )} */}
                        </div>
                    </div>

                    <div className={classes.listing}>
                        <ActiveListingButton
                            item={{
                                erc: 'erc721',
                                id: parcel.tokenId,
                                type: 'parcel',
                                category: '4'
                            }}
                        />
                    </div>
                </div>
            </div>

            {parcel.timesTraded > 0 && (
                <>
                    <h5 className={classes.salesTitle}>Sales History</h5>
                    <SalesHistory historyLoaded={historyLoaded}>
                        <HistoryHead>
                            <HistoryItem>seller</HistoryItem>
                            <HistoryItem>buyer</HistoryItem>
                            <HistoryItem>time</HistoryItem>
                            <HistoryItem>price</HistoryItem>
                        </HistoryHead>

                        <>
                            {history.map((item, index) => (
                                <HistoryRow key={index}>
                                    <HistoryItem>
                                        <EthAddress
                                            address={item.seller}
                                            isShowIcon={true}
                                            isClientLink={true}
                                            isPolygonButton={true}
                                            isCopyButton={true}
                                        />
                                    </HistoryItem>
                                    <HistoryItem>
                                        <EthAddress
                                            address={item.buyer}
                                            isShowIcon={true}
                                            isClientLink={true}
                                            isPolygonButton={true}
                                            isCopyButton={true}
                                        />
                                    </HistoryItem>
                                    <HistoryItem>
                                        <>{DateTime.fromSeconds(parseInt(item.timePurchased)).toRelative()}</>
                                    </HistoryItem>
                                    <HistoryPrice price={EthersApi.fromWei(item.priceInWei)} />
                                </HistoryRow>
                            ))}
                        </>
                    </SalesHistory>
                </>
            )}
        </div>
    );
}
