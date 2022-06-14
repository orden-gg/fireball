import { Grid } from '@mui/material';

import Section from 'components/Section/Section';
import About from './components/About';

import Portals from './components/Portals/Portals';
import Team from './components/Team/Team';
import styles from './styles';

export default function Main() {
    const classes = styles();

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
