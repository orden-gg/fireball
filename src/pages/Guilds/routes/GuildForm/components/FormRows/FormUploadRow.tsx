import UploadIcon from '@mui/icons-material/Upload';
import { Button } from '@mui/material';

import classNames from 'classnames';

import { FormRowProps } from 'pages/Guilds/models';

import { FieldText } from '../FieldText/FieldText';
import { guildFormRowStyles } from './styles';

export function FormUploadRow({ item, onFieldUpdate }: FormRowProps) {
  const classes = guildFormRowStyles();

  const handleInputChange = (event) => {
    onFieldUpdate(item.key, event.target.value);
  };

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
          <input
            accept='image/*'
            id='contained-button-file'
            multiple
            type='file'
            className={classes.formUploadInput}
            onChange={handleInputChange}
          />
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
