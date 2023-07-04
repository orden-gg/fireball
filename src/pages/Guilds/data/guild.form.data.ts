import * as yup from 'yup';

import { GuildFormDataItem, GuildFormValuesResult } from '../models';

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(1, 'Name must be at least 1 characters')
    .max(25, 'Name must not exceed 25 characters')
    .matches(/^[a-zA-Z\s]*$/, 'Name should contain only letters')
    .required('Name is required')
    .default('John Doe'),
  logo: yup
    .string()
    .url('Invalid url format')
    .matches(/^(https?:\/\/.*)$/, 'Invalid URL')
    .required('Url is required')
    .default('https://example.com/logo.png'),
  description: yup
    .string()
    .max(100, 'Description must not exceed 100 characters')
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
