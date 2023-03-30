import { TextField } from '@mui/material';

import classNames from 'classnames';

import { FormRowProps } from 'pages/Guilds/models';

import { FieldText } from '../FieldText/FieldText';
import { guildFormRowStyles } from './styles';

export function FormTextereaRow({ item, onFieldUpdate }: FormRowProps) {
  const classes = guildFormRowStyles();

  const handleInputChange = (event) => {
    onFieldUpdate(item.key, event.target.value);
  };

  return (
    <div className={classes.formRow}>
      <label htmlFor='id1' className={classNames(classes.formLabel, item.required && classes.required)}>
        {item.label}
      </label>
      <div className={classes.formRowBody}>
        <TextField
          id='id2'
          placeholder={item.value as string}
          className={classes.formInput}
          minRows={3}
          maxRows={8}
          fullWidth
          multiline
          onChange={handleInputChange}
        />
        {item.error ? <FieldText type='success'>{item.error}</FieldText> : <></>}
      </div>
    </div>
  );
}
