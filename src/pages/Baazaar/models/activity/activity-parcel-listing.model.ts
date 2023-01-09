import { Parcel } from 'shared/models';

export interface ActivityParcelListingDTO {
    listingId: string;
    priceInWei: string;
    parcel: Parcel;
    buyer: string;
    seller: string;
    timePurchased: string;
}

export interface ActivityParcelListingVM extends Parcel {
    listingId: string;
}
