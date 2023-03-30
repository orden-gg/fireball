import { useCallback, useEffect, useState } from 'react';

import { Button } from '@mui/material';

// import { useAppSelector } from 'core/store/hooks';
// import * as fromLoginStore from 'core/store/login';
import { FormDataType } from 'pages/Guilds/models';

import { FormFieldRow, FormTextereaRow, FormUploadRow } from './components/FormRows';
import { guildFormStyles } from './styles';

export function GuildForm() {
  const classes = guildFormStyles();
  const [formData, setFormData] = useState<FormDataType>({
    name: {
      key: 'name',
      required: true,
      label: 'Set name',
      value: 'name',
      error:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet maiores repellendus quo debitis eveniet aut cumque ipsum ex aperiam tempora.'
    },
    logo: {
      key: 'logo',
      required: true,
      label: 'Upload Logo',
      value: 'Upload',
      error: 'Lorem ipsum dolor sit amet.'
    },
    description: {
      key: 'description',
      required: true,
      label: 'Description',
      value: 'description',
      error: 'Lorem ipsum dolor sit amet. onsectetur adipisicing elit. Amet maiores '
    }
    // warehouse: {
    //   required: false,
    //   label: 'Warehouse type',
    //   value: ['2/3', '3/4', '4/5']
    // },
    // socials: {
    //   required: false,
    //   label: 'Socials',
    //   value: ['twitter', 'discord']
    // }
  });
  // const connectedWallet = useAppSelector(fromLoginStore.getMetamaskLoggedAddresses);

  useEffect(() => {}, []);

  const onFieldUpdate = useCallback(
    (name: string, result: string) => {
      setFormData((formData: FormDataType) => {
        formData[name].result = result;

        return { ...formData };
      });
    },
    [formData]
  );

  const submitForm = useCallback(() => {
    // setFormData();
  }, [formData]);

  return (
    <div className={classes.formWrappper}>
      <h1 className={classes.formTitle}>Registrate Guild</h1>

      <form className={classes.formContent}>
        <FormFieldRow item={formData.name} onFieldUpdate={onFieldUpdate} />

        <FormUploadRow item={formData.logo} onFieldUpdate={onFieldUpdate} />

        <FormTextereaRow item={formData.description} onFieldUpdate={onFieldUpdate} />

        {/* <FormRadioRow item={formData.warehouse} />

        <FormFieldRow item={formData.socials} /> */}

        <div className={classes.formFooter}>
          <Button
            size='large'
            variant='contained'
            type='submit'
            className={classes.formSubmitButton}
            onClick={submitForm}
          >
            Create guild
          </Button>
        </div>
      </form>
    </div>
  );
}
