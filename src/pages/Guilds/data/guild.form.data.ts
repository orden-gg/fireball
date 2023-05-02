import * as yup from 'yup';

import { GuildFormDataItem, GuildFormValuesResult } from '../models';

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(22, 'Name must not exceed 22 characters')
    .matches(/^[a-zA-Z\s]*$/, 'Name should contain only letters')
    .required('Name is required')
    .default('John Doe'),
  logo: yup
    .string()
    .url('Invalid url format')
    .matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg))$/, 'Logo must be in PNG, JPG or JPEG format')
    .required('Url is required')
    .default('https://example.com/logo.png'),
  description: yup
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(100, 'Description must not exceed 100 characters')
    .required('Description is required')
    .default('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
});

export const guildFormData: { [key: string]: GuildFormDataItem } = {
  name: {
    key: 'name',
    label: 'Guild name',
    placeholder: 'name'
  },
  logo: {
    key: 'logo',
    label: 'Guild logo url',
    placeholder: 'logo'
  },
  description: {
    key: 'description',
    label: 'Guild description',
    placeholder: 'description'
  }
};

export const initialValues: GuildFormValuesResult = { name: '', logo: '', description: '' };
