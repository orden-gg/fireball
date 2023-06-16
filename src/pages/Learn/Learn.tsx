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
  Link,
  MenuItem
} from '@mui/material';

import { TransactionResponse } from '@ethersproject/providers';

import { ContentWrapper } from 'components/Content/ContentWrapper';
import { EthersApi } from 'api';
import { DateTime } from 'luxon';
import { LoadingButton } from '@mui/lab';
import { BigNumber } from 'ethers';
import { ethers } from 'ethers';

export function Learn() {
  const [address, setAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [txHistory, setTxHistory] = useState<TransactionResponse[]>([]);
  const [selectedMethodId, setSelectedMethodId] = useState<string>('');

  const onFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    // proceed if valid address
    if (EthersApi.isEthAddress(address)) {
      console.log('trigger', address);
      setTxHistory([]); // clean table before loading new one
      getTxHistory(address);
    } else {
      console.log('not a valid address!', address);
    }
  };

  const getTxHistory = (address: string) => {
    setIsLoading(true);
    EthersApi.getTxHistory(address).then(txs => {
      // Filter and sort tx array based on methodId
      const filteredTxs = txs
        .filter(tx => tx.blockNumber !== undefined && tx.confirmations >= 2); // Filter out transactions without a block number and with less than 2 confirmations
  
      const data = selectedMethodId ? 
        filteredTxs.filter(tx => tx.data.startsWith(selectedMethodId)) : 
        filteredTxs;
  
      const sortedData = data
        .sort((a, b) => (b.blockNumber || 0) - (a.blockNumber || 0))
        .slice(0, 100);
  
      const enrichedData = sortedData.map(tx => {
        const methodData = getMethodData(selectedMethodId, tx.data);

        return { ...tx, methodData };
      });
  
      setIsLoading(false);
      setTxHistory(enrichedData);
      console.log(enrichedData);
    });
  };
  
  const getMethodData = (methodId: string, data: string): string => {
    if (methodId === '0x8027870e') {
      const realmId = BigInt(`0x${data.slice(10, 74)}`).toString();
      const gotchiId = BigInt(`0x${data.slice(74, 138)}`).toString();
      const lastChanneled = BigInt(`0x${data.slice(138, 202)}`).toString();
  
      return `MethodID: ${methodId} _realmId: ${realmId}, _gotchiId: ${gotchiId}, _lastChanneled: ${lastChanneled}`;
    }

    if (methodId === '0x9fefe547') {
      const realmId = BigInt(`0x${data.slice(10, 74)}`).toString();
      const gotchiId = BigInt(`0x${data.slice(74, 138)}`).toString();
  
      return `MethodID: ${methodId} _realmId: ${realmId}, _gotchiId: ${gotchiId}`;
    }
  
    return '';
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
            label='Address'
            variant='outlined'
            size='small'
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          />
          <TextField
            select
            label='Method ID'
            variant='outlined'
            size='small'
            value={selectedMethodId}
            onChange={e => setSelectedMethodId(e.target.value)}
            sx={{ ml: 2 }}
          >
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='0x8027870e'>channelAlchemica</MenuItem>
            <MenuItem value='0x9fefe547'>claimAvailableAlchemica</MenuItem>
            <MenuItem value='0x9f7b91c6'>equipWearables</MenuItem>
            <MenuItem value='0x7a8555b9'>upgradeInstallation</MenuItem>
            <MenuItem value='0x496e6d55'>finalizeUpgrades</MenuItem>
            {/* Add more menu items for other method IDs */}
          </TextField>
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
                  {/* <TableCell>hash</TableCell> */}
                  <TableCell>polygonscan</TableCell>
                  <TableCell>Method Data</TableCell> {/* New column for method data */}
                </TableRow>
              </TableHead>
              <TableBody>
                {txHistory.map((tx, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{tx.blockNumber}</TableCell>
                    <TableCell>{DateTime.fromSeconds(tx.timestamp!).toRelative()}</TableCell>
                    {/* <TableCell>{tx.hash.substring(0,10)}</TableCell> */}
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
                    <TableCell>
                      {getMethodData(selectedMethodId,tx.data)}
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
        <Typography>Playground for learning and practicing</Typography>
      </Box>
    </ContentWrapper>
  );
}
