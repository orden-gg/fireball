import { useState } from 'react';

import classNames from 'classnames';

import { Parcel as ParcelModel } from 'shared/models';
// import { ERC721Listing } from 'components/Items/ERC721Listing/ERC721Listing';
// import { CardSalesHistory } from 'components/ItemCard/components';
import { CopyToClipboardBlock } from 'components/CopyToClipboard/CopyToClipboardBlock';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { ChannelingInfo } from 'components/ChannelingInfo/ChannelingInfo';
import { CustomModal } from 'components/CustomModal/CustomModal';
import { ParcelPreview } from 'components/Previews/ParcelPreview/ParcelPreview';
import { ParcelImage } from 'components/Items/ParcelImage/ParcelImage';
import { ShineLabel } from 'components/Labels/ShineLabel';
import { CitadelUtils, GotchiverseUtils } from 'utils';

import { ParcelName } from './ParcelName';
import { ParcelInstallations } from '../ParcelInstallations/ParcelInstallations';
import { ParcelSurvey } from '../ParcelSurvey/ParcelSurvey';
import { ERC1155InnerStyles, tooltipStyles, itemStyles, parselStyles } from '../styles';

export function Parcel({ parcel }: { parcel: ParcelModel }) {
    const classes = {
        ...itemStyles(),
        ...ERC1155InnerStyles(),
        ...tooltipStyles(),
        ...parselStyles()
    };

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const parcelSize: any = CitadelUtils.getParcelSizeName(parcel.size);

    const boosts = {
        fud: parcel.fudBoost,
        fomo: parcel.fomoBoost,
        alpha: parcel.alphaBoost,
        kek: parcel.kekBoost
    };

    return (
        <>
            <div
                className={classNames(classes.item, parcelSize, classes.parcelCard, 'parcel')}
                onClick={() => setModalOpen(true)}
            >
                <div className={classes.labels}>
                    <CopyToClipboardBlock
                        className={classNames(
                            classes.label,
                            classes.labelTotal,
                            classes.labelRarityColored,
                            classes.idHash
                        )}
                        text={parcel.id}
                    >
                        <span>#{parcel.id}</span>
                    </CopyToClipboardBlock>

                    <CustomTooltip title='District' placement='top' followCursor>
                        <div className={classNames(classes.label, classes.labelBalance)}>{parcel.district}</div>
                    </CustomTooltip>
                </div>

                <div className={classes.parcelSize}>
                    <ShineLabel text={CitadelUtils.getParcelDimmentions(parcel.size)} />
                </div>

                <div className={classes.parcelImageWrapper}>
                    <ParcelImage parcel={parcel} imageSize={300} key={parcel.parcelId} />

                    <div className={classes.parcelImageBottom}>
                        <div className={classes.boosts}>
                            {Object.entries(boosts).map(([key, value]: (string | number)[]) => {
                                return value > 0 ? (
                                    <div className={classNames(classes.boost, key)} key={key}>
                                        <img src={GotchiverseUtils.getAlchemicaImg(key)} alt={key as string} width={13} />
                                        {value}
                                    </div>
                                ) : null;
                            })}
                        </div>
                        <ParcelSurvey
                            surveys={parcel.surveys}
                            alchemica={parcel.alchemica}
                            size={parcel.size}
                         />
                    </div>
                </div>

                <ParcelName parcel={parcel} />

                {/* {parcel.timePurchased && (
                    <CardSalesHistory
                        className={classes.history}
                        listing={{
                            seller: parcel.seller,
                            buyer: parcel.buyer,
                            timePurchased: parcel.timePurchased
                        }}
                    />
                )} */}

                <ChannelingInfo parcel={parcel} />

                {(parcel.installations || parcel.tiles) && (
                    <div className={classes.parcelInstallations}>
                        <ParcelInstallations
                            parcel={parcel}
                            className={classNames('custom-scroll', classes.installations)}
                        />
                    </div>
                )}

                {/* <div className={classes.parcelPriceContainer}>
                    <ERC721Listing listings={parcel.listings} historicalPrices={parcel.historicalPrices} />
                </div> */}
            </div>

            <CustomModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <ParcelPreview parcel={parcel} />
            </CustomModal>
        </>
    );
}
