import React from 'react';
import { Container, Grid } from '@mui/material';

import useClasses from '../../hooks/useClasses';
import styles from './styles';

export default function Section({children, backgroundColor}) {
    const classes = useClasses(styles);

    return (
        <Grid container className={classes.section} style={{ backgroundColor: backgroundColor }}>
            <Container maxWidth='lg'>
                {children}
            </Container>
        </Grid>
    );
}