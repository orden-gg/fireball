import { TextField } from '@mui/material';

import classNames from 'classnames';

import { FormRowProps } from 'pages/Guilds/models';

import { FieldText } from '../FieldText/FieldText';
import { guildFormRowStyles } from './styles';

export function FormFieldRow({ item, onFieldUpdate }: FormRowProps) {
  const classes = guildFormRowStyles();

  const renderGroup = (values: string[]) => {
    return values.map((value: string, index: number) => (
      <TextField id='id2' key={index} placeholder={value} className={classes.formInput} fullWidth size='small' />
    ));
  };

  const handleInputChange = (event) => {
    onFieldUpdate(item.key, event.target.value);
  };

  return (
    <div className={classes.formRow}>
      <label htmlFor='id1' className={classNames(classes.formLabel, item.required && classes.required)}>
        {item.label}
      </label>
      <div className={classes.formRowBody}>
        {typeof item.value === 'string' ? (
          <TextField
            id='id1'
            placeholder={item.value as string}
            className={classes.formInput}
            fullWidth
            onChange={handleInputChange}
          />
        ) : (
          <div className={classes.formGroup}>{renderGroup(item.value as string[])}</div>
        )}
        {item.error ? <FieldText type='success'>{item.error}</FieldText> : <></>}
      </div>
    </div>
  );
}
