import React from 'react';
import { Paper } from '@mui/material';

import classNames from 'classnames';

import ParcelImage from 'components/Items/ParcelImage/ParcelImage';
import EthAddress from 'components/EthAddress/EthAddress';
import ActiveListingButton from 'components/ActiveListingButton/ActiveListingButton';
import itemUtils from 'utils/itemUtils';

import SalesHistory from '../SalesHistory/SalesHistory';
import styles from './styles';

export default function ParcelPreview({ parcel }) {
    const classes = styles();

    const boosts = [
        { name: 'fud', value: parcel.fudBoost },
        { name: 'fomo', value: parcel.fomoBoost },
        { name: 'alpha', value: parcel.alphaBoost },
        { name: 'kek', value: parcel.kekBoost }
    ];

    const modifyName = (hash) => {
        return hash.replace(/-/g, ' ');
    };

    return (
        <div className={classes.container}>
            <div className={classes.inner}>
                <div className={classes.image}>
                    <ParcelImage parcel={parcel} imageSize={300}/>
                </div>

                <div className={classes.content}>
                    <div className={classes.contentInner}>
                        <div className={classes.contentTop}>
                            <h5 className={classes.name}>{modifyName(parcel.parcelHash)}</h5>
                            <EthAddress
                                address={parcel.owner.id}
                                icon={true}
                                clientLink={true}
                                polygonButton={true}
                                copyButton={true}
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
                                {itemUtils.getParcelSize(parcel.size)}
                                ({itemUtils.getParcelDimmentions(parcel.size)})
                            </Paper>
                        </div>

                        <div className={classes.boosts}>
                            { boosts.map((boost, i) => {
                                const multiplierValue = itemUtils.getAlchemicaMultiplier(boost.name);
                                const totalBoost = boost.value * multiplierValue;

                                return boost.value > 0 ? (
                                    <div className={classNames(classes.boost, boost.name)} key={i}>
                                        <img
                                            src={itemUtils.getAlchemicaTokenImg(boost.name)}
                                            alt={boost.name}
                                            width={32}
                                        />
                                        <div className={classes.boostInner}>
                                            <h5>{totalBoost}</h5>
                                            <p>{boost.value}pts  x {multiplierValue}</p>
                                        </div>
                                    </div>
                                ) : (
                                    null
                                )
                            })}
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

            { parcel.timesTraded > 0 && (
                <div className={classes.sales}>
                    <h5 className={classes.salesTitle}>Sales History</h5>
                    <SalesHistory id={parcel.tokenId} category={4} />
                </div>
            )}
        </div>
    );
}
