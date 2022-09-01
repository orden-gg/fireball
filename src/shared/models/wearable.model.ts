import { Erc1155Item } from './erc-1155-item.model';

export interface Wearable extends Erc1155Item {
    benefit: {
        first: string;
        second: string;
    },
    itemType: string;
}
