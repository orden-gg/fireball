import { Dispatch, SetStateAction, useState } from 'react';

import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Checkbox, FormControlLabel } from '@mui/material';

import { useLocalStorage } from 'hooks/useLocalStorage';

import { AnvilCalculatorOptions, AnvilItem } from '../../models';
import { AnvilButton } from '../AnvilButton/AnvilButton';
import { AnvilSection } from '../AnvilSection/AnvilSection';
import { AnvilSummary } from '../AnvilSummary/AnvilSummary';
import { styles } from './styles';

const defaultOptions: AnvilCalculatorOptions = {
  showGltr: true,
  showDetailedAlchemica: true
};

export function AnvilCalculator({ anvil }: { anvil: AnvilItem }) {
  const classes = styles();

  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(anvil.levels.length - 1);

  const [options, setOptions]: [AnvilCalculatorOptions, Dispatch<SetStateAction<AnvilCalculatorOptions>>] =
    useLocalStorage('ANVIL_OPTIONS', JSON.parse(localStorage.getItem('ANVIL_OPTIONS')!) || defaultOptions);

  if (!anvil) {
    return null;
  }

  const handleFrom = (event) => {
    const state = event.currentTarget.innerText;

    if (!state) {
      return;
    }

    setFrom(state === '+' ? from + 1 : from - 1);
  };

  const handleTo = (event) => {
    const state = event.currentTarget.innerText;

    if (!state) {
      return;
    }

    setTo(state === '+' ? to + 1 : to - 1);
  };

  const handleOptionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedOptions = {
      ...options,
      [event.target.name]: event.target.checked
    };

    setOptions(updatedOptions);
    localStorage.setItem('ANVIL_OPTIONS', JSON.stringify(updatedOptions));
  };

  return (
    <div>
      <div className={classes.anvilCalc}>
        <div className={classes.anvilCalcSection}>
          <AnvilButton text='-' onClick={handleFrom} disabled={from === 0} />
          <AnvilSection item={anvil.levels[from]} imageIndex={anvil.id + from} options={options} />
          <AnvilButton text='+' onClick={handleFrom} disabled={from === to - 1} />
        </div>

        <div className={classes.anvilCalcCore}>
          <DoubleArrowIcon className={classes.anvilCalcArrow} />
          <div className={classes.anvilCalcOptions}>
            {Object.entries(options).map(([name, value], index) => (
              <div key={index}>
                <FormControlLabel
                  control={<Checkbox checked={value} onChange={handleOptionsChange} name={name} />}
                  label={name.replace(/([A-Z])/g, ' $1').toLowerCase()}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={classes.anvilCalcSection}>
          <AnvilButton text='-' onClick={handleTo} disabled={to === from + 1} />
          <AnvilSection item={anvil.levels[to]} imageIndex={anvil.id + to} options={options} />
          <AnvilButton text='+' onClick={handleTo} disabled={to === anvil.levels.length - 1} />
        </div>
      </div>
      <AnvilSummary summary={[...anvil.levels].splice(from + 1, to - from)} options={options} />
    </div>
  );
}
