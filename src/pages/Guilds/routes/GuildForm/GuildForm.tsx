import { Button } from '@mui/material';

import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { useAppSelector } from 'core/store/hooks';
import * as fromLoginStore from 'core/store/login';

import { FormDataType } from 'pages/Guilds/models';

import { ConnectWallet } from 'components/ConnectWallet/ConnectWallet';

import { FormFieldRow, FormTextereaRow } from './components/FormRows';
import { guildFormStyles } from './styles';

const validationSchema = yup.object({
  name: yup.string().min(2, 'Name must be at least 2 characters').max(22, 'Name must not exceed 22 characters'),
  logo: yup.string().url('Invalid url format').required('Url is required'),
  description: yup
    .string()
    .min(20, 'Name must be at least 20 characters')
    .max(100, 'Name must not exceed 100 characters')
});

const formData: FormDataType = {
  name: {
    required: true,
    key: 'name',
    label: 'Set name',
    placeholder: 'name'
  },
  logo: {
    required: true,
    key: 'logo',
    label: 'Set logo url',
    placeholder: 'Upload'
  },
  description: {
    required: true,
    key: 'description',
    label: 'Set description',
    placeholder: 'description'
  }
};

export function GuildForm() {
  const classes = guildFormStyles();
  const connectedWallet = useAppSelector(fromLoginStore.getMetamaskLoggedAddresses);

  const handleSubmit = (values) => {
    console.log(`Submitted name: ${values.name}, url: ${values.url}`);
  };

  return connectedWallet ? (
    <div className={classes.formWrappper}>
      <h1 className={classes.formTitle}>Registrate Guild</h1>
      <Formik
        initialValues={{ name: '', logo: '', description: '1' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ dirty, isValid }) => (
          <Form className={classes.formContent}>
            <FormFieldRow fieldData={formData.name} />

            <FormFieldRow fieldData={formData.logo} />

            <FormTextereaRow fieldData={formData.description} />

            <div className={classes.formFooter}>
              <Button
                type='submit'
                size='large'
                variant='contained'
                className={classes.formSubmitButton}
                disabled={!dirty || !isValid}
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
