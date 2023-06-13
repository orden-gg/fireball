import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoadingButton } from '@mui/lab';
import { IconButton, Tooltip } from '@mui/material';

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
                <LoadingButton
                  type='submit'
                  size='large'
                  variant='contained'
                  loading={isRequestInProgress}
                  loadingPosition='center'
                  className={classes.formSubmitButton}
                  disabled={!isValid || isRequestInProgress}
                >
                  {primaryButtonText}
                </LoadingButton>
              </div>
              <Tooltip title={secondaryButtonText}>
                <IconButton className={classes.formBackButton} onClick={() => onHandleBackTo()}>
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}
