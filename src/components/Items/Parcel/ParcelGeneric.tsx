import { Tooltip, Typography } from '@mui/material';
import classNames from 'classnames';

import { RaffleItemChance } from 'pages/Raffle/components/RaffleItemChance';
import itemUtils from 'utils/itemUtils';

import { ERC1155InnerStyles, tooltipStyles, itemStyles, parselStyles } from '../styles';

interface ParcelGenericProps {
    parcel: any;
    raffleChances: any;
}

export function ParcelGeneric({ parcel, raffleChances }: ParcelGenericProps) {
    const classes = {
        ...itemStyles(),
        ...ERC1155InnerStyles(),
        ...tooltipStyles(),
        ...parselStyles()
    };

    const size: any = itemUtils.getParcelSize(parcel.size);

    return (
        <div className={classNames(classes.item, size, classes.parcelCard)}>

            <div className={classes.labels}>

                <Tooltip
                    title='Quantity'
                    classes={{ tooltip: classes.customTooltip }}
                    placement='top'
                    followCursor
                >
                    <div className={classNames(classes.label, classes.labelBalance)}>
                        <Typography variant='subtitle2'>
                            {parcel.balance}
                        </Typography>
                    </div>
                </Tooltip>
            </div>

            <div className={'two-lined'} >
                <Typography className={size}>
                    {size}
                </Typography>
            </div>

            <div className={classes.size}>
                {itemUtils.getParcelDimmentions(parcel.size)}
            </div>

            {raffleChances && <RaffleItemChance stats={raffleChances} />}
        </div>
    );
}
