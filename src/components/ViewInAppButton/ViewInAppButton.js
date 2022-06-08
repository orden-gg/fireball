import { Button } from '@mui/material';

import styles from './styles';

export default function ViewInAppButton({ link }) {
    const classes = styles();

    return (
        <Button
            className={classes.button}
            href={link}
            size='small'
            variant='contained'
            target='_blank'
            fullWidth
        >
            View in App
        </Button>
    );
}
