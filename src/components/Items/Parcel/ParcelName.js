import React, { useState } from 'react';
import { Typography } from '@mui/material';
import CallMade from '@mui/icons-material/CallMade';
import classNames from 'classnames';

import CustomModal from 'components/Modal/Modal';
import ParcelPreview from 'components/Previews/ParcelPreview/ParcelPreview';
import itemUtils from 'utils/itemUtils';

import { ERC1155InnerStyles, tooltipStyles, itemStyles, parselStyles } from '../styles';
import CopyToClipboardBlock from 'components/CopyToClipboard/CopyToClipboardBlock';

export default function ParcelName({ parcel }) {
    const classes = {
        ...itemStyles(),
        ...ERC1155InnerStyles(),
        ...tooltipStyles(),
        ...parselStyles()
    };

    const [modalOpen, setModalOpen] = useState(false);

    const size = itemUtils.getParcelSize(parcel.size);

    return (
        <>
            <CopyToClipboardBlock text={parcel.parcelHash}>
                <div className={classNames(classes.parcelName, classes.textHighlight, size)}>
                    {parcel.parcelHash}
                </div>
            </CopyToClipboardBlock>


            <CustomModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <ParcelPreview parcel={parcel} />
            </CustomModal>
        </>
    )
}
