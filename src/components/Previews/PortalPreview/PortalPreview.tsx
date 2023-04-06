import { Paper } from '@mui/material';

import { ClientPortal, PortalOwnGotchi } from 'pages/Client/models';

import { EthAddress } from 'components/EthAddress/EthAddress';
import { CardERC721Listing, CardGroup, CardName, CardPortalImage, CardSlot } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';

import { styles } from './styles';

export function PortalPreview({ portal }: { portal: ClientPortal }) {
  const classes = styles();

  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <ItemCard type={`haunt${portal.hauntId}`} id={portal.id} category={portal.category}>
          <CardGroup name='body'>
            <CardSlot>{`Haunt ${portal.hauntId}`}</CardSlot>
            <CardPortalImage category={portal.category} hauntId={portal.hauntId} />
          </CardGroup>
          <CardGroup name='footer'>
            <CardERC721Listing
              currentListingId={portal.listingId}
              currentPrice={portal.listingPrice}
              historicalPrices={portal.historicalPrices}
            />
          </CardGroup>
        </ItemCard>
        <div className={classes.description}>
          <div className={classes.address}>
            <h5 className={classes.name}>{`Portal ${portal.id}`}</h5>
            <EthAddress
              address={portal.owner.id}
              isShowIcon={true}
              isClientLink={true}
              isPolygonButton={true}
              isCopyButton={true}
            />
          </div>
          <div className={classes.badges}>
            <Paper className={classes.badge} elevation={0}>
              <span className={classes.highlighted}>Portal bought at: </span>
              {portal.boughtAt}
            </Paper>
            <Paper className={classes.badge} elevation={0}>
              <span className={classes.highlighted}>Times traded: </span>
              {portal.timesTraded}
            </Paper>
            {portal.activeListing ? (
              <Paper className={classes.badge} elevation={0}>
                <span className={classes.highlighted}>Active listing: </span>
                {portal.activeListing}
              </Paper>
            ) : (
              <></>
            )}
          </div>
          <>
            {portal.gotchi ? (
              <div>
                <CardName>Gotchi</CardName>
                {portal.gotchi.map((item: PortalOwnGotchi, index: number) => (
                  <>
                    <div className={classes.gotchi} key={index}>
                      <CardSlot>{`Gotchi id: ${item.id}`}</CardSlot>
                      {/* <CardSlot>{`Gotchi name: ${item.name}`}</CardSlot> */}
                    </div>
                  </>
                ))}
              </div>
            ) : (
              <></>
            )}
          </>
        </div>
      </div>
    </div>
  );
}
