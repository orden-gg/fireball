import styles from './styles';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Modal } from '@mui/material';

import classNames from 'classnames';

export default function CustomModal({ children, modalOpen, setModalOpen, onModalClose, className }) {
    const classes = styles();

    const onClose = () => {
        setModalOpen(false);

        if (onModalClose) {
            onModalClose();
        }
    };

    return (
        <Modal
            open={modalOpen}
            onClose={onClose}
            className={classes.wrapper}
        >
            <div className={classNames(classes.modal, className)}>
                { children }
                <IconButton className={classes.close} onClick={onClose}>
                    <CloseIcon  />
                </IconButton>
            </div>
        </Modal>
    );

}
