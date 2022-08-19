import { RootState } from 'core/store/store';
import { Erc1155Item, SortingItem } from 'shared/models';

export const getInitialGlossaryWearables = (state: RootState): Erc1155Item[] => state.glossary.initialWearables;
export const getGlossaryWearables = (state: RootState): Erc1155Item[] => state.glossary.wearables;
export const getGlossaryWearablesCount = (state: RootState): number => state.glossary.wearables.length;
export const getWearablesSorting = (state: RootState): SortingItem => state.glossary.wearablesSorting;
export const getMaxWearablePrice = (state: RootState): number => state.glossary.maxWearablePrice;
