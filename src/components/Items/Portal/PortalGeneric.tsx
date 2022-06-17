import { Tooltip, Typography } from '@mui/material';
import classNames from 'classnames';

import { RaffleItemChance } from 'pages/Raffle/components/RaffleItemChance';
import h2SealedPortal from 'assets/images/portals/h2-sealed.svg';

import { ERC1155InnerStyles, tooltipStyles, itemStyles, parselStyles, portalStyles } from '../styles';

interface PortalGenericProps {
    portal: any;
    raffleChances: any;
}

export function PortalGeneric({ portal, raffleChances }: PortalGenericProps) {
    const classes = {
        ...itemStyles(),
        ...ERC1155InnerStyles(),
        ...tooltipStyles(),
        ...parselStyles(),
        ...portalStyles()
    };

    return (
        <div className={classNames(classes.item, classes.portalCard)}>
            <div className={classes.labels}>
                <Tooltip
                    title='Quantity'
                    classes={{ tooltip: classes.customTooltip }}
                    placement='top'
                    followCursor
                >
                    <div className={classNames(classes.label, classes.labelBalance)}>
                        <Typography variant='subtitle2'>
                            {portal.balance}
                        </Typography>
                    </div>
                </Tooltip>
            </div>

            <img className={classes.portalImage} src={h2SealedPortal} alt="Portal" />

            <div style={{ marginTop: '16px' }}>
                <Typography>
                    H2 Portal
                </Typography>
            </div>

            {raffleChances && <RaffleItemChance stats={raffleChances} />}
        </div>
    );
}
