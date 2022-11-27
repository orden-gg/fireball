import { Button, ButtonProps } from '@mui/material';

import { styles } from './styles';

interface AnvulButtonProps extends ButtonProps {
    text: string;
}

export function AnvilButton(props: AnvulButtonProps) {
    const classes = styles();

    return (
        <Button {...props} variant='contained' color='secondary' className={classes.anvilCalcButton}>
            {props.text}
        </Button>
    );
}
