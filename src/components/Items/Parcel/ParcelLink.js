import React, { useEffect, useState } from 'react';
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

    const [name, setName] = useState('');
    const [size, setSize] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        setName(parcel.parcelHash.replace(/-/g, ' '));
        setSize(itemUtils.getParcelSize(parcel.size));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div
                className={classNames(classes.nameWrapper, 'two-lined', 'parcel-name')}
                onClick={() => setModalOpen(true)}
            >
                <Typography className={classNames(classes.name, classes.textHighlight, size)}>
                    {name}
                </Typography>
                <CallMade className={classes.callMadeIcon} />

            </div>


            <CustomModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <ParcelPreview parcel={parcel} />
            </CustomModal>
        </>
    )
}
