import { CustomTooltip } from 'components/custom/CustomTooltip';
import { GhstTokenGif } from 'components/Icons/Icons';
import { CommonUtils } from 'utils';

import { styles } from './styles';

interface CardTotalPriceProps {
    balance: number;
    price: number;
}

// TODO this component is currently used for Fake Gotchi components and should be replacement
// TODO for CardTotalPrice component in ItemCard submodule. Possibly should be moved to
// TODO ItemCard directory
export function CardTotalPrice({ balance, price }: CardTotalPriceProps) {
    const classes = styles();

    return (
        <CustomTooltip
            title='Total value'
            placement='top'
            followCursor
        >
            <div className={classes.total}>
                <span>{price ? CommonUtils.formatPrice(price * balance) : '???'}</span>
                <GhstTokenGif width={18} height={18} />
            </div>
        </CustomTooltip>
    );
}
