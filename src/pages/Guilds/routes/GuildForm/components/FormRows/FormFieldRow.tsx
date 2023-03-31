import { TextField } from '@mui/material';

import classNames from 'classnames';
import { useField } from 'formik';

import { validationSchema } from 'pages/Guilds/data';
import { FormRowProps } from 'pages/Guilds/models';

import { guildFormRowStyles } from './styles';

export function FormFieldRow({ fieldData }: FormRowProps) {
  const classes = guildFormRowStyles();
  const [field, meta] = useField(fieldData.key);
  const defaultValue: string = validationSchema.fields[fieldData.key].default();
  const isRequired: boolean = Boolean(validationSchema.fields[fieldData.key].required());

  return (
    <div className={classes.formRow}>
      <label htmlFor={fieldData.key} className={classNames(classes.formLabel, isRequired && classes.required)}>
        {fieldData.label}
      </label>
      <div className={classes.formRowBody}>
        <TextField
          {...field}
          className={classes.formInput}
          error={meta.touched && Boolean(meta.error)}
          fullWidth
          helperText={meta.touched ? meta.error || defaultValue : defaultValue}
          id={fieldData.key}
          placeholder={fieldData.placeholder}
          required={isRequired}
        />
      </div>
    </div>
  );
}
