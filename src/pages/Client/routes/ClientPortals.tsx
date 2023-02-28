import { useContext } from 'react';

import { ContentInner } from 'components/Content/ContentInner';
import { ItemCard } from 'components/ItemCard/containers';
import { ClientContext } from 'contexts/ClientContext';
import { routersStyles } from '../styles';
import { CardERC721Listing, CardGroup, CardName, CardPortalImage, CardSlot } from 'components/ItemCard/components';

export function ClientPortals() {
  const classes = routersStyles();
  const { portals, loadingPortals } = useContext<any>(ClientContext);

  return (
    <ContentInner dataLoading={loadingPortals}>
      <div>
        <div className={classes.list}>
          {portals.map((portal: any, index: number) => (
            <div className={classes.listItem} key={index}>
              <ItemCard type={`haunt${portal.hauntId}`} id={portal.id} category={portal.category}>
                <CardGroup name='body'>
                  <CardSlot>{`Haunt ${portal.hauntId}`}</CardSlot>
                  <CardPortalImage category={portal.category} hauntId={portal.hauntId} />
                  <CardName>{`Portal ${portal.id}`}</CardName>
                </CardGroup>
                <CardGroup name='footer'>
                  <CardERC721Listing
                    currentListingId={portal.listingId}
                    currentPrice={portal.listingPrice}
                    historicalPrices={portal.historicalPrices}
                  />
                </CardGroup>
              </ItemCard>
            </div>
          ))}
        </div>
      </div>
    </ContentInner>
  );
}
