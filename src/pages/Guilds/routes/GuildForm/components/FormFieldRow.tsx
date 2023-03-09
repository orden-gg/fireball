import { TextField } from '@mui/material';
import classNames from 'classnames';
import { FormDataItem } from '../GuildForm';
import { guildFormStyles } from '../styles';
import { FieldText } from './FieldText';

export function FormFieldRow({ item }: { item: FormDataItem }) {
  const classes = guildFormStyles();

  const renderGroup = (values: string[]) => {
    return values.map((value: string, index: number) => (
      <TextField id='id2' key={index} placeholder={value} className={classes.formInput} fullWidth size='small' />
    ));
  };

  return (
    <div className={classes.formRow}>
      <label htmlFor='id1' className={classNames(classes.formLabel, item.required && classes.required)}>
        {item.label}
      </label>
      <div className={classes.formRowBody}>
        {typeof item.value === 'string' ? (
          <TextField id='id1' placeholder={item.value as string} className={classes.formInput} fullWidth />
        ) : (
          <div className={classes.formGroup}>{renderGroup(item.value as string[])}</div>
        )}
        {item.error ? <FieldText type='success'>{item.error}</FieldText> : <></>}
      </div>
    </div>
  );
}
