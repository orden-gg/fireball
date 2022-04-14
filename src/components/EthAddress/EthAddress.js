import React from 'react';
import { IconButton, Link } from '@mui/material';
import CallMade from '@mui/icons-material/CallMade';

import Blockies from 'react-blockies';

import ethersApi from 'api/ethers.api.js';
import commonUtils from 'utils/commonUtils.js';

import styles from './styles.js'
import CopyToClipboard from 'components/CopyToClipboard/CopyToClipboard.js';

export default function EthAddress({ address, icon, clientLink, polygonLink, copy }) {
    const classes = styles();

    if(!ethersApi.isEthAddress(address)) {
        return null;
    }

    return (
        <div className={classes.container}>
            { icon && <Blockies
                seed={address}
                size={8}
                scale={2.5}
                className={classes.icon}
            />}

            { clientLink ? (
                <Link
                    href={`/client/?address=${address}`}
                    target='_blank'
                    className={classes.link}
                >
                    {commonUtils.cutAddress(address, '..')}
                </Link>
            ) : (
                <span className={classes.text}>
                    {commonUtils.cutAddress(address, '..')}
                </span>
            )}

            { copy && <div className={classes.button}>
                <CopyToClipboard copy={address} />
            </div>}

            { polygonLink && <div className={classes.button}>
                <IconButton
                    href={`https://polygonscan.com/address/${address}`}
                    target='_blank'
                    size='small'
                >
                    <CallMade className={classes.linkIcon} />
                </IconButton>
            </div>}
        </div>
    );
}
