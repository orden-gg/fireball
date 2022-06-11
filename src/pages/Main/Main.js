import { Grid } from '@mui/material';

import Section from 'components/Section/Section';
import About from './components/About';

import Portals from './components/Portals/Portals';
import Team from './components/Team/Team';

export default function Main() {
    return (
        <Grid container>
            <Section backgroundColor='rgba(33, 36, 41, .2)'>
                <Portals />
            </Section>
            <Section backgroundColor='rgb(39, 42, 48)'>
                <Team />
            </Section>

            <Section>
                <About />
            </Section>
        </Grid>
    );
}
