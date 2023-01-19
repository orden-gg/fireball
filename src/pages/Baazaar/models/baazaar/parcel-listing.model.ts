import { Parcel, ParcelVM } from 'shared/models';

export interface ParcelListingDTO {
    id: string;
    priceInWei: string;
    parcel: Parcel;
}

export interface ParcelListingVM extends ParcelVM {
    id: string;
}
