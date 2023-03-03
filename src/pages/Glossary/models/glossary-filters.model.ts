import {
  InputFilter,
  MultiAutocompleteFilter,
  MultiButtonSelectionFilter,
  RangeSliderFilter,
  Wearable
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
