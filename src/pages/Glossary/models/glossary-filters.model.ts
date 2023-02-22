import {
  Wearable,
  MultiAutocompleteFilter,
  MultiButtonSelectionFilter,
  RangeSliderFilter,
  InputFilter
} from 'shared/models';

export interface GlossaryWearablesFilters {
  rarity: MultiButtonSelectionFilter<Wearable>;
  slot: MultiButtonSelectionFilter<Wearable>;
  traitModifier: MultiButtonSelectionFilter<Wearable>;
  search: InputFilter<Wearable>;
  itemType: MultiAutocompleteFilter<Wearable>;
  benefit: MultiAutocompleteFilter<Wearable>;
  listingPrice: RangeSliderFilter<Wearable>;
}
