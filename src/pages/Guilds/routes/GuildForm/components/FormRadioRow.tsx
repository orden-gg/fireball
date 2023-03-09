import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import classNames from 'classnames';
import { FormDataItem } from '../GuildForm';
import { guildFormStyles } from '../styles';

export function FormRadioRow({ item }: { item: FormDataItem }) {
  const classes = guildFormStyles();

  const renderRadio = (value: string[]) => {
    return (
      <RadioGroup
        row
        aria-labelledby='demo-radio-buttons-group-label'
        defaultValue={value[0]}
        name='radio-buttons-group'
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
