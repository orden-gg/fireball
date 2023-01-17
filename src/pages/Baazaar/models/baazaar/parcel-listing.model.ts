import { ParcelDTO, ParcelVM } from 'shared/models';

export interface ParcelListingDTO {
    id: string;
    priceInWei: string;
    parcel: ParcelDTO;
}

export interface ParcelListingVM extends ParcelVM {
    id: string;
}
