
import React from 'react';
import useStyles from './styles';
import { Box, Modal, Fade, Paper } from '@mui/material';
 
export default function ModalWrapper({children, modalOpen, handleClose, width}) {
    const classes = useStyles();

    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
            className={classes.modal}
            closeAfterTransition
        >
            <Fade in={modalOpen}>
                <Paper variant='outlined'>
                    <Box padding={2} width={width}>
                        {children}
                    </Box>
                </Paper>
            </Fade>
        </Modal>
    );
}
