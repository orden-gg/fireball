import { ParcelDTO, ParcelVM } from 'shared/models';

export interface ActivityParcelListingDTO {
    id: string;
    priceInWei: string;
    parcel: ParcelDTO;
}

export interface ActivityParcelListingVM extends ParcelVM {
    id: string;
}
