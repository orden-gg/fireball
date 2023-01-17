import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() =>
    createStyles({
        image: {
            position: 'relative',
            background: alpha('#000', 0.1),
            maxWidth: '100%',
            paddingBottom: '100%',
            '& canvas': {
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                transition: 'transform .3s ease-in-out'
            },
            '& img': {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '50%',
                maxHeight: '50%'
            }
        }
    })
);
