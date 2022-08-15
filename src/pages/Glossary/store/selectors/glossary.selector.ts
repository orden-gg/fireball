import { RootState } from 'core/store/store';
import { Erc1155Item, SortingItem } from 'shared/models';

export const getGlossaryWearables = (state: RootState): Erc1155Item[] => state.glossary.wearables;
export const getWearablesSorting = (state: RootState): SortingItem => state.glossary.wearablesSorting;
