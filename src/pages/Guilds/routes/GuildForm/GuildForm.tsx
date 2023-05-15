import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

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
  const params = useParams<{ id: string }>();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const isEdit: boolean = location.pathname.indexOf('edit') > 0;

  const connectedWallet = useAppSelector(fromLoginStore.getMetamaskLoggedAddresses);
  const editGuildData: GuildFormValuesResult = useAppSelector(fromGuildsStore.getEditGuildData);
  const isCurrentGuildLoaded: boolean = useAppSelector(fromGuildsStore.getIsCurrentGuildLoaded);
  const isCreateGuildRequestInProgress: boolean = useAppSelector(fromGuildsStore.getIsCreateGuildRequestInProgress);

  useEffect(() => {
    if (isEdit && !isCurrentGuildLoaded) {
      dispatch(fromGuildsStore.onLoadCurrentGuildById(params.id!));
    }
  }, []);

  const handleSubmit = (values: GuildFormValuesResult): void => {
    const trimmedValues: GuildFormValuesResult = {
      name: values.name.trim(),
      description: values.description.trim(),
      logo: values.logo.trim()
    };

    if (isEdit) {
      dispatch(fromGuildsStore.onUpdateGuild(trimmedValues));
    } else {
      dispatch(fromGuildsStore.onCreateGuild(trimmedValues));
    }
  };

  return connectedWallet && metaState.isAvailable ? (
    <div className={classes.formWrapper}>
      <h1 className={classes.formTitle}>{isEdit ? 'Edit Guild' : 'Guild Register'} </h1>
      <Formik
        initialValues={isEdit ? editGuildData : initialValues}
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
                  {isEdit ? 'Edit' : 'Create'} guild
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
