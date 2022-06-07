import { GhstTokenGif } from 'components/Icons/Icons';
import ethersApi from 'api/ethers.api';

import styles from './styles';

export default function HorizontalPrice({ item, label }) {
    const classes = styles();

    return (
        <div className={classes.priceRoot}>
            {label || ''}
            <GhstTokenGif width={25} height={25} />
            {
                ethersApi.fromWei(item.priceInWei)
            }
        </div>
    );
}
