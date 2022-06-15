import { Container, Grid } from '@mui/material';

import { styles } from './styles';

interface SectionProps {
    children: JSX.Element;
    backgroundColor: string;
}

export function Section({ children, backgroundColor }: SectionProps) {
    const classes = styles();

    return (
        <Grid
            container
            className={classes.section}
            style={{ backgroundColor: backgroundColor }}
        >
            <Container maxWidth='lg'>
                {children}
            </Container>
        </Grid>
    );
}
