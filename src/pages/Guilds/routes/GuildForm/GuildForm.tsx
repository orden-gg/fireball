import { Button } from '@mui/material';
import { useCallback, useState } from 'react';
import { FormFieldRow } from './components/FormFieldRow';
import { FormRadioRow } from './components/FormRadioRow';
import { FormTextereaRow } from './components/FormTextereaRow';
import { FormUploadRow } from './components/FormUploadRow';

import { guildFormStyles } from './styles';

export type FormDataItem = {
  required: boolean;
  label: string;
  value: string | string[];
  error?: string;
};

const formData: { [key: string]: FormDataItem } = {
  name: {
    required: true,
    label: 'Set name',
    value: 'name',
    error:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet maiores repellendus quo debitis eveniet aut cumque ipsum ex aperiam tempora.'
  },
  logo: {
    required: true,
    label: 'Upload Logo',
    value: 'Upload',
    error: 'Lorem ipsum dolor sit amet.'
  },
  description: {
    required: true,
    label: 'Description',
    value: 'Write description',
    error: 'Lorem ipsum dolor sit amet. onsectetur adipisicing elit. Amet maiores '
  },
  warehouse: {
    required: false,
    label: 'Warehouse type',
    value: ['2/3', '3/4', '4/5']
  },
  socials: {
    required: false,
    label: 'Socials',
    value: ['twitter', 'discord']
  }
};

export function GuildForm() {
  const classes = guildFormStyles();
  const [formResult, setFormResult] = useState<FormDataItem[]>([]);

  const submitForm = useCallback(() => {
    setFormResult([]);
  }, [formResult]);

  return (
    <div className={classes.formWrappper}>
      <h1 className={classes.formTitle}>Registrate Guild</h1>

      <form className={classes.formContent}>
        <FormFieldRow item={formData.name} />

        <FormUploadRow item={formData.logo} />

        <FormTextereaRow item={formData.description} />

        <FormRadioRow item={formData.warehouse} />

        <FormFieldRow item={formData.socials} />

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
