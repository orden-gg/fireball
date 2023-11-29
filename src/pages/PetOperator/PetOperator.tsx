import { useState } from 'react';

import { Button, CircularProgress, FormControlLabel, Grid, Paper, Switch, TextField } from '@mui/material';

import { EthersApi, MainApi } from 'api';

import { CommonUtils } from 'utils';

import { styles } from './styles';

export function PetOperator() {
  const classes = styles();

  const [isSetFormSubmitted, setIsSetFormSubmitted] = useState<boolean>(false);
  const [isCheckFormSubmitted, setIsCheckFormSubmitted] = useState<boolean>(false);

  const [operator, setOperator] = useState<string>('');
  const [operatorChecked, setOperatorChecked] = useState<boolean>(true);

  const [owner, setOwner] = useState<string>('');
  const [operatorProceed, setOperatorProceed] = useState<string>('');

  const [isCheckingSet, setIsCheckingSet] = useState<boolean>(false);
  const [resultHash, setResultHash] = useState<string>('');
  const [isCheckingOperator, setIsCheckingOperator] = useState<boolean>(false);
  const [checkingResult, setCheckingResult] = useState<string>('');

  const isAddressValid = (addr: string): boolean => {
    return EthersApi.isEthAddress(addr);
  };

  const handleSubmitSetOperator = async (event) => {
    event.preventDefault();
    setIsSetFormSubmitted(true);

    if (isAddressValid(operator)) {
      setIsCheckingSet(true);

      await MainApi.approvePet(operatorChecked, operator)
        .then((res) => {
          setResultHash(res.transactionHash);
        })
        .catch((error) => {
          console.log('error', error);
        })
        .finally(() => setIsCheckingSet(false));
    }
  };

  const handleSubmitIsOperator = async (event) => {
    event.preventDefault();
    setIsCheckFormSubmitted(true);

    if (isAddressValid(owner) && isAddressValid(operatorProceed)) {
      setIsCheckingOperator(true);

      await MainApi.isPetOperator(owner, operatorProceed)
        .then((res: boolean) => {
          setCheckingResult(res.toString());
        })
        .catch((error) => {
          console.log('error', error);
        })
        .finally(() => setIsCheckingOperator(false));
    }
  };

  return (
    <div className={classes.container}>
      <div>
        <h1 style={{ textAlign: 'center' }}>pet operator</h1>
      </div>
      <Grid container justifyContent='space-between' columns={16}>
        <Grid xs={16} sm={7.75} item>
          <h5>
            <span>setPetOperatorForAll</span>
          </h5>
          <Paper sx={{ padding: 2 }}>
            <form onSubmit={handleSubmitSetOperator}>
              <div className={classes.inputRow}>
                <TextField
                  error={isSetFormSubmitted && !isAddressValid(operator)}
                  helperText={isSetFormSubmitted && !isAddressValid(operator) ? 'not valid eth address!' : ''}
                  id='operator2'
                  label='_operator (address)'
                  size='small'
                  onChange={(e) => setOperator(e.target.value)}
                />
              </div>
              <div className={classes.inputRow}>
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked
                      checked={operatorChecked}
                      onChange={(e) => setOperatorChecked(e.target.checked)}
                    />
                  }
                  label={operatorChecked ? 'true' : 'false'}
                />
              </div>
              <Button variant='contained' type='submit' disabled={isCheckingSet}>
                Submit
                {isCheckingSet && <CircularProgress size={20} className={classes.progress} />}
              </Button>
              {resultHash && (
                <div style={{ marginTop: 8 }}>
                  <span style={{ color: '#2ee72e' }}>tx sent!</span>
                  <a
                    href={`https://polygonscan.com/tx/${resultHash}`}
                    target='_blank'
                    rel='noreferrer'
                    style={{ color: '#dadada', marginLeft: '8px' }}
                  >
                    view on polygonscan
                  </a>
                </div>
              )}
            </form>
          </Paper>
        </Grid>
        <Grid xs={16} sm={7.75} item>
          <h5>
            <span>isPetOperatorForAll</span>
          </h5>
          <Paper sx={{ padding: 2 }}>
            <form onSubmit={handleSubmitIsOperator}>
              <div className={classes.inputRow}>
                <TextField
                  error={isCheckFormSubmitted && !isAddressValid(owner)}
                  helperText={isCheckFormSubmitted && !isAddressValid(owner) ? 'not valid eth address!' : ''}
                  id='owner1'
                  label='_owner (address)'
                  size='small'
                  onChange={(e) => setOwner(e.target.value)}
                />
              </div>
              <div className={classes.inputRow}>
                <TextField
                  error={isCheckFormSubmitted && !isAddressValid(operatorProceed)}
                  helperText={isCheckFormSubmitted && !isAddressValid(operatorProceed) ? 'not valid eth address!' : ''}
                  id='operator1'
                  label='_operator (address)'
                  size='small'
                  onChange={(e) => setOperatorProceed(e.target.value)}
                />
              </div>
              <Button variant='contained' type='submit' disabled={isCheckingOperator}>
                Submit
                {isCheckingOperator && <CircularProgress size={20} className={classes.progress} />}
              </Button>
              {checkingResult && (
                <div style={{ marginTop: 8 }}>
                  approved:{' '}
                  <span style={{ color: CommonUtils.stringToBoolean(checkingResult) ? '#2ee72e' : '#ff2929' }}>
                    {checkingResult}
                  </span>
                </div>
              )}
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
