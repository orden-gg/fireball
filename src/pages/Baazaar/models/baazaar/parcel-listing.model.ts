import { Parcel } from 'shared/models';

export interface ParcelListingDTO {
    listingId: string;
    priceInWei: string;
    parcel: Parcel;
}

export interface ParcelListingVM extends Parcel {
    listingId: string;
}
