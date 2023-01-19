import { Parcel, ParcelVM } from 'shared/models';

export interface ActivityParcelListingDTO {
    id: string;
    listingId: string;
    priceInWei: string;
    parcel: Parcel;
    buyer: string;
    seller: string;
    timePurchased: string;
}

export interface ActivityParcelListingVM extends ParcelVM {
    id: string;
}
