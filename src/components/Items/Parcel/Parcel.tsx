import { useState } from 'react';

import classNames from 'classnames';

import { ERC721Listing } from 'components/Items/ERC721Listing/ERC721Listing';
import { CopyToClipboardBlock } from 'components/CopyToClipboard/CopyToClipboardBlock';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { ChannelingInfo } from 'components/ChannelingInfo/ChannelingInfo';
import { CustomModal } from 'components/Modal/Modal';
import { ParcelPreview } from 'components/Previews/ParcelPreview/ParcelPreview';
import { ParcelImage } from 'components/Items/ParcelImage/ParcelImage';
import { ShineLabel } from 'components/Labels/ShineLabel';
import { ItemUtils } from 'utils';

import { ParcelName } from './ParcelName';
import { ParcelInstallations } from '../ParcelInstallations/ParcelInstallations';
import { ERC1155InnerStyles, tooltipStyles, itemStyles, parselStyles } from '../styles';

export function Parcel({ parcel }: { parcel: any }) {
    const classes = {
        ...itemStyles(),
        ...ERC1155InnerStyles(),
        ...tooltipStyles(),
        ...parselStyles()
    };

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const size: any = ItemUtils.getParcelSize(parcel.size);

    const boosts = {
        fud: parcel.fudBoost,
        fomo: parcel.fomoBoost,
        alpha: parcel.alphaBoost,
        kek: parcel.kekBoost
    };

    return (
        <>
            <div
                className={classNames(classes.item, size, classes.parcelCard)}
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
                        text={parcel.tokenId}
                    >
                        #{parcel.tokenId}
                    </CopyToClipboardBlock>

                    <CustomTooltip
                        title='District'
                        placement='top'
                        followCursor
                    >
                        <div className={classNames(classes.label, classes.labelBalance)}>
                            {parcel.district}
                        </div>
                    </CustomTooltip>
                </div>

                <div className={classes.parcelSize}>
                    <ShineLabel text={ItemUtils.getParcelDimmentions(parcel.size)} />
                </div>

                <div className={classes.parcelImageWrapper}>
                    <ParcelImage
                        parcel={parcel}
                        imageSize={300}
                        key={parcel.parcelId}
                    />
                </div>

                <div className={classes.boosts}>
                    {Object.entries(boosts).map((boost: any, i: number) => {
                        const key = boost[0];
                        const value = boost[1];

                        return value > 0 ? (
                            <div className={classNames(classes.boost, key)} key={i}>
                                <img src={ItemUtils.getAlchemicaImg(key)} alt={key} width={13} />
                                {value}
                            </div>
                        ) : (
                            null
                        );
                    })}
                </div>

                <ParcelName parcel={parcel} />

                { parcel.channeling && (
                    <ChannelingInfo channeling={parcel.channeling} />
                )}

                { parcel.installations && (
                    <div className={classes.parcelInstallations}>
                        <ParcelInstallations parcel={parcel} />
                    </div>
                )}

                <div className={classes.parcelPriceContainer}>
                    <ERC721Listing listings={parcel.listings} historicalPrices={parcel.historicalPrices}/>
                </div>
            </div>


            <CustomModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <ParcelPreview parcel={parcel} />
            </CustomModal>
        </>
    );
}
