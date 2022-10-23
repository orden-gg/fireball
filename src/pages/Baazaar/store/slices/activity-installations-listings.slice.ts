import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc1155Categories } from 'shared/constants';
import { GraphQueryParams } from 'shared/models';

import { ActivityInstallationListingVM } from '../../models';

export interface ActivityInstallationsListingsState {
    activityInstallationsListings: {
        data: ActivityInstallationListingVM[];
        isLoading: boolean;
        isLoaded: boolean;
        isError: boolean;
    };
    activityInstallationsListingsGraphQueryParams: GraphQueryParams;
}

const initialState: ActivityInstallationsListingsState = {
    activityInstallationsListings: {
        data: [],
        isLoading: false,
        isLoaded: false,
        isError: false
    },
    activityInstallationsListingsGraphQueryParams: {
        first: 50,
        skip: 0,
        orderBy: 'timePurchased',
        orderDirection: 'desc',
        where: {
            category: Erc1155Categories.Installation
        }
    }
};

export const activityInstallationsListingsSlice = createSlice({
    name: 'activityInstallationsListings',
    initialState,
    reducers: {
        loadActivityInstallationsListings: (state): void => {
            state.activityInstallationsListings = {
                ...state.activityInstallationsListings,
                isLoading: true,
                isLoaded: false,
                isError: false
            };
        },
        loadActivityInstallationsListingsSucceded: (state, action: PayloadAction<ActivityInstallationListingVM[]>): void => {
            state.activityInstallationsListings = {
                data: action.payload,
                isLoading: false,
                isLoaded: true,
                isError: false
            };
        },
        loadActivityInstallationsListingsFailed: (state): void => {
            state.activityInstallationsListings = {
                ...state.activityInstallationsListings,
                isLoading: false,
                isLoaded: true,
                isError: true
            };
        },
        resetActivityInstallationsListings: (state): void => {
            state.activityInstallationsListings.data = [];
        }
    }
});

export const {
    loadActivityInstallationsListings,
    loadActivityInstallationsListingsSucceded,
    loadActivityInstallationsListingsFailed,
    resetActivityInstallationsListings
} = activityInstallationsListingsSlice.actions;

export const activityInstallationsListingsReducer = activityInstallationsListingsSlice.reducer;
