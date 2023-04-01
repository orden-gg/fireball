import { TextField } from '@mui/material';

import classNames from 'classnames';
import { useField } from 'formik';

import { validationSchema } from 'pages/Guilds/data';
import { GuildFormRowProps } from 'pages/Guilds/models';

import { guildFormRowStyles } from './styles';

export function GuildFormTextareaRow({ fieldData }: GuildFormRowProps) {
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
          id={fieldData.key}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched ? meta.error || defaultValue : defaultValue}
          placeholder={fieldData.placeholder}
          className={classes.formInput}
          fullWidth
          multiline
          minRows={3}
          maxRows={8}
          required={isRequired}
        />
      </div>
    </div>
  );
}
