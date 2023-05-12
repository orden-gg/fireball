import { Button } from '@mui/material';

import { Field, Form, Formik } from 'formik';
import { useMetamask } from 'use-metamask';

import * as fromGuildsStore from '../../store';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromLoginStore from 'core/store/login';

import { guildFormData, initialValues, validationSchema } from 'pages/Guilds/data';
import { GuildFormValuesResult } from 'pages/Guilds/models';

import { ConnectWallet } from 'components/ConnectWallet/ConnectWallet';

import { GuildFormFieldRow, GuildFormTextareaRow } from './components/FormRows';
import { guildFormStyles } from './styles';

export function GuildForm() {
  const classes = guildFormStyles();

  const { metaState } = useMetamask();

  const dispatch = useAppDispatch();

  const connectedWallet = useAppSelector(fromLoginStore.getMetamaskLoggedAddresses);
  const isCreateGuildRequestInProgress: boolean = useAppSelector(fromGuildsStore.getIsCreateGuildRequestInProgress);

  const handleSubmit = (values: GuildFormValuesResult): void => {
    dispatch(fromGuildsStore.onCreateGuild(values));
  };

  return connectedWallet && metaState.isAvailable ? (
    <div className={classes.formWrapper}>
      <h1 className={classes.formTitle}>Guild Register</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange
      >
        {({ isValid }) => (
          <div className={classes.formContent}>
            <Form className={classes.form}>
              <Field component={GuildFormFieldRow} fieldData={guildFormData.name} />

              <Field component={GuildFormFieldRow} fieldData={guildFormData.logo} />

              <Field component={GuildFormTextareaRow} fieldData={guildFormData.description} />

              <div className={classes.formFooter}>
                <Button
                  type='submit'
                  size='large'
                  variant='contained'
                  className={classes.formSubmitButton}
                  disabled={!isValid || isCreateGuildRequestInProgress}
                >
                  Create guild
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  ) : (
    <ConnectWallet />
  );
}
