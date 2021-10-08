import React from 'react';
import { Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    section: {
        padding: '50px 0',
        [theme.breakpoints.up('md')]: {
            padding: '75px 0'
        }
    }
}));

export default function Section({children, backgroundColor}) {
    const classes = useStyles();

    return (
        <Grid container className={classes.section} style={{ backgroundColor: backgroundColor }}>
            <Container maxWidth='lg'>
                {children}
            </Container>
        </Grid>
    );
}