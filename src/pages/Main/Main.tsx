import { Grid } from '@mui/material';

import { About } from './components/About';
import { Section } from 'components/Section/Section';

import { Portals } from './components/Portals/Portals';
import { Team } from './components/Team/Team';

export function Main() {
    return (
        <Grid container>
            <Section backgroundColor='rgba(33, 36, 41, .2)'>
                <Portals />
                <About />
            </Section>
            <Section backgroundColor='rgb(39, 42, 48)'>
                <Team />
            </Section>
        </Grid>
    );
}
