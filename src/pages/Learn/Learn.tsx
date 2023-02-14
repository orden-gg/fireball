import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link
} from '@mui/material';

import { TransactionResponse } from '@ethersproject/providers';

import { ContentWrapper } from 'components/Content/ContentWrapper';
import { EthersApi } from 'api';
import { DateTime } from 'luxon';
import { LoadingButton } from '@mui/lab';

export function Learn() {
  const [address, setAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [txHistory, setTxHistory] = useState<TransactionResponse[]>([]);

  const onFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    // proceed if valid address
    if (EthersApi.isEthAddress(address)) {
      console.log('trigger', address);
      setTxHistory([]); // clean table before load new one
      getTxHistory(address);
    } else {
      console.log('not a valid address!', address);
    }
  };

  const getTxHistory = (address: string) => {
    setIsLoading(true);
    EthersApi.getTxHistory(address).then(txs => {
      // ! slice tx array - get only last 100 tx
      const data = txs.length ? txs.reverse().slice(0, 100) : [];

      setIsLoading(false);
      setTxHistory(data);
    });
  };

  return (
    <ContentWrapper>
      {/* Content */}
      <Box sx={{ padding: 2 }}>
        <Typography variant='h6' sx={{ mb: 1 }}>
          Tx history
        </Typography>

        <form onSubmit={onFormSubmit}>
          <TextField
            label='address'
            variant='outlined'
            size='small'
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          />
          <LoadingButton variant='contained' type='submit' loading={isLoading} sx={{ mt: '1px', ml: 1 }}>
            Submit
          </LoadingButton>
        </form>

        {txHistory.length ? (
          <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>blockNumber</TableCell>
                  <TableCell>timestamp</TableCell>
                  <TableCell>hash</TableCell>
                  <TableCell>polygonscan</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {txHistory.map((tx, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{tx.blockNumber}</TableCell>
                    <TableCell>{DateTime.fromSeconds(tx.timestamp!).toRelative()}</TableCell>
                    <TableCell>{tx.hash}</TableCell>
                    <TableCell>
                      <Link
                        href={`https://polygonscan.com/tx/${tx.hash}`}
                        target='_blank'
                        color='burlywood'
                        underline='hover'
                      >
                        {tx.hash.slice(0, 6)}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
      </Box>

      {/* Sidebar */}
      <Box sx={{ padding: 2 }}>
        <Typography variant='h6' sx={{ mb: 1 }}>
          Sidebar
        </Typography>
        <Typography>playground for learning and practicing</Typography>
      </Box>
    </ContentWrapper>
  );
}
