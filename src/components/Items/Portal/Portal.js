import { Link, Tooltip, Typography } from '@mui/material';
import CallMade from '@mui/icons-material/CallMade';

import classNames from 'classnames';

import ERC721Listing from 'components/Items/ERC721Listing/ERC721Listing';

import PortalImage from './PortalImage';
import CardName from '../common/CardName/CardName';
import { ERC1155InnerStyles, tooltipStyles, itemStyles, parselStyles, portalStyles } from '../styles';

export default function Portal({ portal }) {
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
                    title='Haunt'
                    classes={{ tooltip: classes.customTooltip }}
                    placement='top'
                    followCursor
                >
                    <div className={classNames(classes.label, classes.labelBalance)}>
                        <Typography variant='subtitle2'>
                            Haunt {portal.portal.hauntId}
                        </Typography>
                    </div>
                </Tooltip>
            </div>

            <PortalImage portal={portal} />

            <div className={classNames(classes.label, classes.labelSlot)}>
                [{portal.tokenId}]
            </div>

            <Link
                href={
                    `https://app.aavegotchi.com/portal/${portal.tokenId}`
                }
                target='_blank'
                underline='none'
                className={classNames(classes.nameWrapper, 'two-lined')}
            >
                <CardName itemName={`Portal ${portal.tokenId}`} itemRarity={'none'} item={portal} />
                <CallMade className={classes.callMadeIcon} />
            </Link>

            <div className={classes.portalPriceContainer}>
                <ERC721Listing listings={portal.listings} historicalPrices={portal.historicalPrices}/>
            </div>
        </div>
    );
}
