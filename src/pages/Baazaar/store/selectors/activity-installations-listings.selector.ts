import { RootState } from 'core/store/store';

import { ActivityInstallationListingVM } from '../../models';

export const getActivityInstallationsListings = (state: RootState): ActivityInstallationListingVM[] =>
    state.baazaar.activity.installations.activityInstallationsListings.data;

export const getIsActivityInstallationsListingsLoading = (state: RootState): boolean =>
    state.baazaar.activity.installations.activityInstallationsListings.isLoading;

