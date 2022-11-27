import { useState } from 'react';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import { AnvilSection } from './AnvilSection';
import { AnvilButton } from './AnvilButton';
import { AnvilItem } from '../models';

import { anvilCalcStyles } from '../styles';
import { AnvilSummary } from './AnvilSummary';

export function AnvilCalculator({ anvil }: { anvil: AnvilItem }) {
    const classes = anvilCalcStyles();

    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(anvil.levels.length - 1);

    if (!anvil) return null;

    const handleFrom = (event) => {
        const state = event.currentTarget.innerText;

        if (!state) return;

        setFrom(state === '+' ? from + 1 : from - 1);
    };

    const handleTo = (event) => {
        const state = event.currentTarget.innerText;

        if (!state) return;

        setTo(state === '+' ? to + 1 : to - 1);
    };

    return (
        <div>
            <div className={classes.anvilCalc}>
                <div className={classes.anvilCalcSection}>
                    <AnvilButton text='-' onClick={handleFrom} disabled={from === 0} />
                    <AnvilSection item={anvil.levels[from]} imageIndex={anvil.id + from} />
                    <AnvilButton text='+' onClick={handleFrom} disabled={from === to - 1} />
                </div>

                <DoubleArrowIcon className={classes.anvilCalcArrow} />

                <div className={classes.anvilCalcSection}>
                    <AnvilButton text='-' onClick={handleTo} disabled={to === from + 1} />
                    <AnvilSection item={anvil.levels[to]} imageIndex={anvil.id + to} />
                    <AnvilButton text='+' onClick={handleTo} disabled={to === anvil.levels.length - 1} />
                </div>
            </div>
            <div className={classes.anvilCalcFooter}>
                <AnvilSummary summary={[...anvil.levels].splice(from + 1, to + 1)} />
            </div>
        </div>
    );
}
