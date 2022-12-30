import { ParcelDTO, ParcelVM } from 'shared/models';

export interface ActivityParcelListingDTO {
    id: string;
    priceInWei: string;
    parcel: ParcelDTO;
    buyer: string;
    seller: string;
    timePurchased: string;
}

export interface ActivityParcelListingVM extends ParcelVM {
    id: string;
}
