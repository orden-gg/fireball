import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

import classNames from 'classnames';

import { FormRowProps } from 'pages/Guilds/models';

import { guildFormRowStyles } from './styles';

export function FormRadioRow({ item, onFieldUpdate }: FormRowProps) {
  const classes = guildFormRowStyles();

  const handleRadioChange = (event) => {
    onFieldUpdate(item.key, event.target.value);
  };

  const renderRadio = (value: string[]) => {
    return (
      <RadioGroup
        row
        aria-labelledby='demo-radio-buttons-group-label'
        defaultValue={value[0]}
        name='radio-buttons-group'
        onChange={handleRadioChange}
      >
        {value.map((value: string, index: number) => (
          <FormControlLabel key={index} className={classes.formRadio} value={value} control={<Radio />} label={value} />
        ))}
      </RadioGroup>
    );
  };

  return (
    <div className={classes.formRow}>
      <span className={classNames(classes.formLabel, item.required && classes.required)}>{item.label}</span>
      <div className={classes.formRowBody}>{renderRadio(item.value as string[])}</div>
    </div>
  );
}
