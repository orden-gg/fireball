import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { CardImage } from 'shared/components/CardImage/CardImage';
import { AnvilIcon } from 'components/Icons/Icons';
import { CardBalance, CardCraftLink, CardGroup, CardName } from 'components/ItemCard/components';
import { CardListing } from 'shared/components/CardListing/CardListing';
import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';

import { ActivityInstallationListingVM } from '../../models';

import * as fromBaazaarStore from '../../store';

import { styles } from './styles';

export function BaazaarActivityInstallations() {
    const classes = styles();

    const dispatch = useAppDispatch();
    const activityInstallationsListings: ActivityInstallationListingVM[] =
        useAppSelector(fromBaazaarStore.getActivityInstallationsListings);
    const isActivityInstallationsListingsLoading: boolean = useAppSelector(fromBaazaarStore.getIsActivityInstallationsListingsLoading);

    useEffect(() => {
        dispatch(fromBaazaarStore.loadBaazaarActivityInstallationsListings());

        return () => {
            dispatch(fromBaazaarStore.resetActivityInstallationsData());
        };
    }, []);

    return (
        <ContentWrapper paddingZero isShowSidebar={false}>
            <>
                {
                    <div className={classes.results}>
                        <span>{activityInstallationsListings.length}</span>
                        <span className={classes.placeholder}>
                            <AnvilIcon width={20} height={20} />
                        </span>
                    </div>
                }
                <ContentInner dataLoading={isActivityInstallationsListingsLoading}>
                    <ItemsLazy
                        items={activityInstallationsListings}
                        component={(installationListing: ActivityInstallationListingVM) =>
                            <ItemCard id={installationListing.id} category={installationListing.category} type={installationListing.rarity || 'drop'}>
                                <CardGroup name='header'>
                                    {!installationListing.isDeprecated ? <CardCraftLink name={installationListing.name} /> : <></>}
                                    <CardBalance balance={installationListing.quantity} />
                                </CardGroup>
                                <CardGroup name='body'>
                                    <CardImage src={installationListing.imageSrcUrl} alt={installationListing.name} />
                                    <CardName>{installationListing.name}</CardName>
                                </CardGroup>
                                <CardGroup name='footer'>
                                    <CardListing
                                        currentListing={installationListing.currentListing}
                                        lastSoldListing={installationListing.lastSoldListing}
                                    />
                                </CardGroup>
                            </ItemCard>
                        }
                    />
                </ContentInner>
            </>
            <></>
        </ContentWrapper>
    );
}
