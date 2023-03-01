import { SortingItem, Wearable } from 'shared/models';

import { RootState } from 'core/store/store';

export const getInitialGlossaryWearables = (state: RootState): Wearable[] => state.glossary.initialWearables;
export const getWearablesIds = (state: RootState): number[] =>
  state.glossary.initialWearables.map((wearable) => wearable.id);
export const getGlossaryWearables = (state: RootState): Wearable[] => state.glossary.wearables;
export const getGlossaryWearablesCount = (state: RootState): number => state.glossary.initialWearables.length;
export const getWearablesSorting = (state: RootState): SortingItem => state.glossary.wearablesSorting;
export const getMaxWearablePrice = (state: RootState): number => state.glossary.maxWearablePrice;
