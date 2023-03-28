import UploadIcon from '@mui/icons-material/Upload';
import { Button } from '@mui/material';

import classNames from 'classnames';

import { FormDataItem } from '../../GuildForm';
import { FieldText } from '../FieldText/FieldText';
import { guildFormRowStyles } from './styles';

export function FormUploadRow({ item }: { item: FormDataItem }) {
  const classes = guildFormRowStyles();

  return (
    <div className={classes.formRow}>
      <label
        htmlFor='contained-button-file'
        className={classNames(classes.formLabel, item.required && classes.required)}
      >
        {item.label}
      </label>
      <div className={classes.formRowBody}>
        <label htmlFor='contained-button-file'>
          <input accept='image/*' id='contained-button-file' multiple type='file' className={classes.formUploadInput} />
          <Button
            variant='contained'
            size='medium'
            component='span'
            color='success'
            className={classes.formUploadButton}
            startIcon={<UploadIcon />}
          >
            {item.value}
          </Button>
        </label>
        {item.error ? <FieldText type='default'>{item.error}</FieldText> : <></>}
      </div>
    </div>
  );
}
