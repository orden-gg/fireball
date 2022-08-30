import { GlossaryWearable, MultiAutocompleteFilter, MultiButtonSelectionFilter, RangeSliderFilter } from 'shared/models';

export interface GlossaryWearablesFilters {
    rarity: MultiButtonSelectionFilter<GlossaryWearable>;
    slot: MultiButtonSelectionFilter<GlossaryWearable>;
    traitModifier: MultiButtonSelectionFilter<GlossaryWearable>;
    itemType: MultiAutocompleteFilter<GlossaryWearable>;
    benefit: MultiAutocompleteFilter<GlossaryWearable>;
    listingPrice: RangeSliderFilter<GlossaryWearable>;
}
