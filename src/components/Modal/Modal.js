import styles from './styles';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Modal } from '@mui/material';

import classNames from 'classnames';

export default function CustomModal({ children, modalOpen, setModalOpen, className, handleModalClose }) {
    const classes = styles();

    const onModalClose = () => {
        setModalOpen(false);

        if (Boolean(handleModalClose)) {
            handleModalClose();
        };
    }

    return (
        <Modal
            open={modalOpen}
            onClose={onModalClose}
            className={classes.wrapper}
        >
            <div className={classNames(classes.modal, className || null)}>
                { children }
                <IconButton className={classes.close} onClick={() => setModalOpen(false)}>
                    <CloseIcon  />
                </IconButton>
            </div>
        </Modal>
    )

}
