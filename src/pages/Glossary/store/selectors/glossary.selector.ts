import { RootState } from 'core/store/store';
import { GlossaryWearable, SortingItem } from 'shared/models';

export const getInitialGlossaryWearables = (state: RootState): GlossaryWearable[] => state.glossary.initialWearables;
export const getWearablesIds = (state: RootState): number[] => state.glossary.initialWearables.map(wearable => wearable.id);
export const getGlossaryWearables = (state: RootState): GlossaryWearable[] => state.glossary.wearables;
export const getGlossaryWearablesCount = (state: RootState): number => state.glossary.initialWearables.length;
export const getWearablesSorting = (state: RootState): SortingItem => state.glossary.wearablesSorting;
export const getMaxWearablePrice = (state: RootState): number => state.glossary.maxWearablePrice;
