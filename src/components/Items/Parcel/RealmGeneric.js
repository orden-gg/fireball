import { Tooltip, Typography } from '@mui/material';
import classNames from 'classnames';

import RaffleItemChance from 'pages/Raffle/components/RaffleItemChance';

import { ERC1155InnerStyles, tooltipStyles, itemStyles, parselStyles } from '../styles';

export default function RealmGeneric({ realm, raffleChances }) {
    const classes = {
        ...itemStyles(),
        ...ERC1155InnerStyles(),
        ...tooltipStyles(),
        ...parselStyles()
    };

    return (
        <div className={classNames(classes.item, 'realm-generic', classes.parcelCard)}>

            <div className={classes.labels}>

                <Tooltip
                    title='Quantity'
                    classes={{ tooltip: classes.customTooltip }}
                    placement='top'
                    followCursor
                >
                    <div className={classNames(classes.label, classes.labelBalance)}>
                        <Typography variant='subtitle2'>
                            {realm.balance}
                        </Typography>
                    </div>
                </Tooltip>
            </div>

            <div className={classNames(classes.nameWrapper, 'two-lined')} >
                <Typography className={classNames(classes.name, classes.textHighlight, 'realm-generic')}>
                    Realm
                </Typography>
            </div>

            {raffleChances && <RaffleItemChance stats={raffleChances} />}
        </div>
    );
}
