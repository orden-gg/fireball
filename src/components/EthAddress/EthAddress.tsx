import { IconButton, Link } from '@mui/material';
import CallMade from '@mui/icons-material/CallMade';

import Blockies from 'react-blockies';

import { CustomTooltip } from 'components/custom/CustomTooltip';
import { CopyToClipboard } from 'components/CopyToClipboard/CopyToClipboard';
import ethersApi from 'api/ethers.api.js';
import commonUtils from 'utils/commonUtils.js';

import { styles } from './styles';

interface EthAddressProps {
    address: string;
    isShwoIcon: boolean;
    isClientLink?: boolean;
    isPolygonButton?: boolean;
    isCopyButton?: boolean;
}

export function EthAddress({ address, isShwoIcon, isClientLink, isPolygonButton, isCopyButton }: EthAddressProps) {
    const classes = styles();

    if (!ethersApi.isEthAddress(address)) {
        return null;
    }

    return (
        <div className={classes.container}>
            { isShwoIcon &&
                <Blockies
                    seed={address.toLowerCase()}
                    size={8}
                    scale={2.5}
                    className={classes.icon}
                />
            }

            { isClientLink ? (
                <Link
                    href={`/client/${address}`}
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

            { isCopyButton &&
                <div className={classes.button}>
                    <CopyToClipboard copy={address} />
                </div>
            }

            { isPolygonButton &&
                <div className={classes.button}>
                    <CustomTooltip
                        title={
                            <span>
                                view on <span className='highlight'>polygonscan</span>
                            </span>
                        }
                        placement='top'
                        followCursor
                    >
                        <IconButton
                            href={`https://polygonscan.com/address/${address}`}
                            target='_blank'
                            className={classes.linkButton}
                        >
                            <CallMade className={classes.linkIcon} />
                        </IconButton>
                    </CustomTooltip>
                </div>
            }
        </div>
    );
}