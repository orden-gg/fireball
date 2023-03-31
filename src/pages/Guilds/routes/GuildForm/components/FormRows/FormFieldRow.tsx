import { TextField } from '@mui/material';

import classNames from 'classnames';
import { useField } from 'formik';

import { FormRowProps } from 'pages/Guilds/models';

import { guildFormRowStyles } from './styles';

export function FormFieldRow({ fieldData }: FormRowProps) {
  const classes = guildFormRowStyles();
  const [field, meta] = useField(fieldData.key);

  return (
    <div className={classes.formRow}>
      <label htmlFor={fieldData.key} className={classNames(classes.formLabel, fieldData.required && classes.required)}>
        {fieldData.label}
      </label>
      <div className={classes.formRowBody}>
        <TextField
          {...field}
          id={fieldData.key}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
          placeholder={fieldData.placeholder}
          className={classes.formInput}
          fullWidth
        />
      </div>
    </div>
  );
}
