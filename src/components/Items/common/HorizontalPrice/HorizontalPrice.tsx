import { GhstTokenGif } from 'components/Icons/Icons';
import ethersApi from 'api/ethers.api';

import { styles } from './styles';

interface HorizontalPriceProps {
    item: any;
    label: string;
}

export function HorizontalPrice({ item, label }: HorizontalPriceProps) {
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
