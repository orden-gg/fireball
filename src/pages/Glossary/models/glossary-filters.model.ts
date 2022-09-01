import { Wearable, MultiAutocompleteFilter, MultiButtonSelectionFilter, RangeSliderFilter } from 'shared/models';

export interface GlossaryWearablesFilters {
    rarity: MultiButtonSelectionFilter<Wearable>;
    slot: MultiButtonSelectionFilter<Wearable>;
    traitModifier: MultiButtonSelectionFilter<Wearable>;
    itemType: MultiAutocompleteFilter<Wearable>;
    benefit: MultiAutocompleteFilter<Wearable>;
    listingPrice: RangeSliderFilter<Wearable>;
}
