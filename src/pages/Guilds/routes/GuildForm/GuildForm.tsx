import { Button } from '@mui/material';

import { Field, Form, Formik } from 'formik';

import { guildFormData, validationSchema } from 'pages/Guilds/data';
import { GuildFormValuesResult } from 'pages/Guilds/models';

import { GuildFormFieldRow, GuildFormTextareaRow } from './components/FormRows';
import { guildFormStyles } from './styles';

interface GuildFormProps {
  title: string;
  formValues: GuildFormValuesResult;
  primaryButtonText: string;
  secondaryButtonText: string;
  isRequestInProgress: boolean;
  onHandleBackTo: () => void;
  onHandleSubmit: (values: GuildFormValuesResult) => void;
}

export function GuildForm({
  title,
  formValues,
  primaryButtonText,
  secondaryButtonText,
  isRequestInProgress,
  onHandleBackTo,
  onHandleSubmit
}: GuildFormProps) {
  const classes = guildFormStyles();

  const handleSubmit = (values: GuildFormValuesResult): void => {
    const trimmedValues: GuildFormValuesResult = {
      name: values.name.trim(),
      description: values.description.trim(),
      logo: values.logo.trim()
    };

    onHandleSubmit(trimmedValues);
  };

  return (
    <div className={classes.formWrapper}>
      <h1 className={classes.formTitle}>{title} </h1>
      <Formik initialValues={formValues} validationSchema={validationSchema} onSubmit={handleSubmit} validateOnChange>
        {({ isValid }) => (
          <div className={classes.formContent}>
            <Form className={classes.form}>
              <Field component={GuildFormFieldRow} fieldData={guildFormData.name} />

              <Field component={GuildFormFieldRow} fieldData={guildFormData.logo} />

              <Field component={GuildFormTextareaRow} fieldData={guildFormData.description} />

              <div className={classes.formFooter}>
                <Button
                  type='button'
                  size='large'
                  variant='contained'
                  className={classes.formSubmitButton}
                  onClick={() => onHandleBackTo()}
                >
                  {secondaryButtonText}
                </Button>
                <Button
                  type='submit'
                  size='large'
                  variant='contained'
                  className={classes.formSubmitButton}
                  disabled={!isValid || isRequestInProgress}
                >
                  {primaryButtonText}
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}
