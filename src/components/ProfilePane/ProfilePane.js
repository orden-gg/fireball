import { Typography } from '@mui/material';
import classNames from 'classnames';

import ethersApi from 'api/ethers.api';

import styles from './styles';

export default function ProfilePane({ address }) {
    const classes = styles();
    const isValid = ethersApi.isEthAddress(address);

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
