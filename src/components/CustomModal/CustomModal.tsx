import { ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Modal } from '@mui/material';

import classNames from 'classnames';

import { styles } from './styles';

interface CustomModalProps {
    children: ReactNode;
    modalOpen: boolean;
    setModalOpen: (isOpen: boolean) => void;
    onModalClose?: () => void;
    className?: string;
}

export function CustomModal({ children, modalOpen, setModalOpen, onModalClose, className }: CustomModalProps) {
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
