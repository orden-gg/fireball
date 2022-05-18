import styles from './styles';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Modal } from '@mui/material';

import classNames from 'classnames';

export default function CustomModal({ children, modalOpen, setModalOpen, className }) {
    const classes = styles();

    const onModalClose = () => {
        setModalOpen(false);
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
