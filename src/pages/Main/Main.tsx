import classNames from 'classnames';

import { Section } from 'components/Section/Section';

import { About } from './components/About';
import { Team } from './components/Team/Team';

import { styles } from './styles';

export function Main() {
    const classes = styles();

    return (
        <div className={classes.content}>
            <div className={classes.homeBg}>
                <div className={classNames(classes.flower2, classes.bgPart)}></div>
                <div className={classNames(classes.midgroundFar, classes.bgPart)}></div>
                <div className={classNames(classes.flower1, classes.bgPart)}></div>
                <div className={classNames(classes.smokeMid, classes.bgPart)}></div>
                <div className={classNames(classes.midgroundClose, classes.bgPart)}></div>
                <div className={classNames(classes.smokeClose, classes.bgPart)}></div>
                <div className={classNames(classes.foreground, classes.bgPart)}></div>
            </div>
            <Section backgroundColor='rgb(39, 42, 48)'>
                <Team />
            </Section>
            <About />
        </div>
    );
}
