import { Typography } from '@mui/material';

import classNames from 'classnames';

import ethersApi from 'api/ethers.api';

import { styles } from './styles';

export function ProfilePane({ address }: { address: string }) {
    const classes = styles();

    const isValid: boolean = ethersApi.isEthAddress(address);

    return (
        <div className={classes.container}>
            <Typography variant='h6'>
                Logged as <span
                    className={classNames(classes.profileLogged, !isValid && 'error')}
                >
                    {address}
                    {!isValid ? (
                        <span className={classes.profileInvalidText}>Not a valid address!</span>
                    ) : (
                        null
                    )}
                </span>
            </Typography>
        </div>
    );
}
