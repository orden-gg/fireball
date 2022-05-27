import React, { useState } from 'react';
import { Typography } from '@mui/material';
import CallMade from '@mui/icons-material/CallMade';
import classNames from 'classnames';

import CustomModal from 'components/Modal/Modal';
import ParcelPreview from 'components/Previews/ParcelPreview/ParcelPreview';
import itemUtils from 'utils/itemUtils';

import { ERC1155InnerStyles, tooltipStyles, itemStyles, parselStyles } from '../styles';

export default function ParcelLink({ parcel }) {
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
            <div
                className={classNames(classes.nameWrapper, 'two-lined', 'parcel-name')}
                onClick={() => setModalOpen(true)}
            >
                <Typography className={classNames(classes.name, classes.textHighlight, size)}>
                    {parcel.parcelHash}
                </Typography>
                <CallMade className={classes.callMadeIcon} />

            </div>


            <CustomModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <ParcelPreview parcel={parcel} />
            </CustomModal>
        </>
    )
}
