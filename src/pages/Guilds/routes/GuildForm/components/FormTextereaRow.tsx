import { TextField } from '@mui/material';
import classNames from 'classnames';
import { FormDataItem } from '../GuildForm';
import { guildFormStyles } from '../styles';
import { FieldText } from './FieldText';

export function FormTextereaRow({ item }: { item: FormDataItem }) {
  const classes = guildFormStyles();

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
        />
        {item.error ? <FieldText type='success'>{item.error}</FieldText> : <></>}
      </div>
    </div>
  );
}
