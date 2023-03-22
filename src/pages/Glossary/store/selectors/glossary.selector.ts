import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { Wearable } from 'shared/models';

import { GlossaryState } from '../slices';

const glossaryStateSelector = createSelector(
  (state: RootState) => state.glossary,
  (glossaryState: GlossaryState) => glossaryState
);

export const getInitialGlossaryWearables = createSelector(
  glossaryStateSelector,
  (state: GlossaryState) => state.initialWearables
);

export const getWearablesIds = createSelector(glossaryStateSelector, (state: GlossaryState) =>
  state.initialWearables.map((wearable: Wearable) => wearable.id)
);

export const getGlossaryWearables = createSelector(glossaryStateSelector, (state: GlossaryState) => state.wearables);

export const getGlossaryWearablesCount = createSelector(
  glossaryStateSelector,
  (state: GlossaryState) => state.initialWearables.length
);

export const getWearablesSorting = createSelector(
  glossaryStateSelector,
  (state: GlossaryState) => state.wearablesSorting
);

export const getMaxWearablePrice = createSelector(
  glossaryStateSelector,
  (state: GlossaryState) => state.maxWearablePrice
);
