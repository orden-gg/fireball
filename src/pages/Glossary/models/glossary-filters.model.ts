import { Erc1155Item, MultiButtonSelectionFilter, RangeSliderFilter } from 'shared/models';

export interface GlossaryWearablesFilters {
    rarity: MultiButtonSelectionFilter<Erc1155Item>;
    slot: MultiButtonSelectionFilter<Erc1155Item>;
    traitModifier: MultiButtonSelectionFilter<Erc1155Item>;
    listingPrice: RangeSliderFilter<Erc1155Item>;
}
