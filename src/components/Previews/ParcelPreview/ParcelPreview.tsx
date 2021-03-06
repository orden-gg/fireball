import { Paper } from '@mui/material';

import classNames from 'classnames';

import { ActiveListingButton } from 'components/ActiveListingButton/ActiveListingButton';
import { EthAddress } from 'components/EthAddress/EthAddress';
import { ParcelImage } from 'components/Items/ParcelImage/ParcelImage';
import { ParcelInstallations } from 'components/Items/ParcelInstallations/ParcelInstallations';
import { ItemUtils } from 'utils';

import { SalesHistory } from '../SalesHistory/SalesHistory';

import { styles } from './styles';

export function ParcelPreview({ parcel }: { parcel: any }) {
    const classes = styles();

    const boosts: Array<{ name: string; value: any }> = [
        { name: 'fud', value: parcel.fudBoost },
        { name: 'fomo', value: parcel.fomoBoost },
        { name: 'alpha', value: parcel.alphaBoost },
        { name: 'kek', value: parcel.kekBoost }
    ];

    const modifyName = (hash: string) => {
        return hash.replace(/-/g, ' ');
    };

    return (
        <div className={classes.container}>
            <div className={classes.inner}>
                <div className={classes.image}>
                    <ParcelImage parcel={parcel} imageSize={300}/>
                </div>

                <div className={classes.content}>
                    <div>
                        <div className={classes.contentTop}>
                            <h5 className={classes.name}>{modifyName(parcel.parcelHash)}</h5>
                            <EthAddress
                                address={parcel.owner?.id}
                                isShwoIcon={true}
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
                                {ItemUtils.getParcelSize(parcel.size)}
                                ({ItemUtils.getParcelDimmentions(parcel.size)})
                            </Paper>
                        </div>

                        <div className={classes.boosts}>
                            { boosts.map((boost, i) => {
                                const multiplierValue = ItemUtils.getAlchemicaMultiplier(boost.name);
                                const totalBoost = boost.value * multiplierValue;

                                return boost.value > 0 ? (
                                    <div className={classNames(classes.boost, boost.name)} key={i}>
                                        <img
                                            src={ItemUtils.getAlchemicaTokenImg(boost.name)}
                                            alt={boost.name}
                                            width={32}
                                        />
                                        <div>
                                            <h5>{totalBoost}</h5>
                                            <p>{boost.value}pts  x {multiplierValue}</p>
                                        </div>
                                    </div>
                                ) : (
                                    null
                                );
                            })}
                        </div>

                        { parcel.installations?.length > 0 && (
                            <div className={classes.installations}>
                                <ParcelInstallations parcel={parcel} size={80} />
                            </div>
                        )}
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

            { parcel.timesTraded > 0 && (
                <div className={classes.sales}>
                    <h5 className={classes.salesTitle}>Sales History</h5>
                    <SalesHistory id={parcel.tokenId} category={4} />
                </div>
            )}
        </div>
    );
}
