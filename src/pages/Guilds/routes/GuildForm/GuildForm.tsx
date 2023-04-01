import { Button } from '@mui/material';

import { Field, Form, Formik } from 'formik';
import { useMetamask } from 'use-metamask';

import { GuildRegistrationApi } from 'pages/Guilds/api/guild.api';

import { useAppSelector } from 'core/store/hooks';
import * as fromLoginStore from 'core/store/login';

import { formData, initialValues, validationSchema } from 'pages/Guilds/data';

import { ConnectWallet } from 'components/ConnectWallet/ConnectWallet';

import { FormFieldRow, FormTextareaRow } from './components/FormRows';
import { guildFormStyles } from './styles';

export function GuildForm() {
  const classes = guildFormStyles();
  const connectedWallet = useAppSelector(fromLoginStore.getMetamaskLoggedAddresses);
  const { metaState } = useMetamask();

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);

    GuildRegistrationApi.createGuildSafe(values)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        console.log('some code');
      });
  };

  return connectedWallet && metaState.isAvailable ? (
    <div className={classes.formWrapper}>
      <h1 className={classes.formTitle}>Registrate Guild</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={true}
        onSubmit={handleSubmit}
      >
        {({ isValid, isSubmitting }) => (
          <Form className={classes.formContent}>
            <Field component={FormFieldRow} fieldData={formData.name} />

            <Field component={FormFieldRow} fieldData={formData.logo} />

            <Field component={FormTextareaRow} fieldData={formData.description} />

            <div className={classes.formFooter}>
              <Button
                type='submit'
                size='large'
                variant='contained'
                className={classes.formSubmitButton}
                disabled={!isValid || isSubmitting}
              >
                Create guild
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <ConnectWallet />
  );
}
