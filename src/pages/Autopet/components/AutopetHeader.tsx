import { Alert, AlertTitle } from '@mui/material';

import { headerStyles } from '../styles';

export function AutopetHeader() {
  const classes = headerStyles();

  return (
    <div>
      <h1 className={classes.autopetTitle}>Trustless Autopet</h1>

      <div className={classes.warnings}>
        <Alert severity='error' className={classes.autopetHeaderWarning}>
          <AlertTitle>AUTOPET IS DISABLED</AlertTitle>
          due to unstatainable maintainance cost this autopet was disabled untill we find a model to fund it <br />
          <br />
          please unstacke your GHST
        </Alert>
      </div>
    </div>
  );
}
