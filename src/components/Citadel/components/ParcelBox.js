import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Parcel from 'components/Items/Parcel/Parcel';

import { ParcelBoxStyle } from '../styles';

export default function ParcelBox({ removeSelected, selectedParcel }) {
    const classes = ParcelBoxStyle();
    const isShown = selectedParcel !== null;

    return isShown && (
        <div className={classes.parcel}>
            <Parcel parcel={selectedParcel} />

            <IconButton className={classes.closeParcel} onClick={ removeSelected }>
                <CloseIcon />
            </IconButton>
        </div>
    )
}
