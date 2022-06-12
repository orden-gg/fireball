import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Modal } from '@mui/material';

import classNames from 'classnames';

import { styles } from './styles';

interface CustomModalProps {
    children: JSX.Element;
    modalOpen: boolean;
    setModalOpen: (isOpen: boolean) => void;
    onModalClose: () => void;
}

export function CustomModal({ children, modalOpen, setModalOpen, onModalClose }: CustomModalProps) {
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
            <div className={classes.modal}>
                { children }
                <IconButton className={classes.close} onClick={onClose}>
                    <CloseIcon  />
                </IconButton>
            </div>
        </Modal>
    );

}
