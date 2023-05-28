import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';

const selectSlice = state => state.products || initialState;

const selectProduct = createSelector([selectSlice], state => state);

export const selectproducts = createSelector(
  [selectProduct],
  state => state.products,
);

export const selectLoading = createSelector(
  [selectProduct],
  state => state.loading,
);

export const selectloadingAddproduct = createSelector(
  [selectProduct],
  state => state.loadingAddproduct,
);

export const selectgetproduct = createSelector(
  [selectProduct],
  state => state.editproduct,
);

export const selectLoadinggetproduct = createSelector(
  [selectProduct],
  state => state.getEditproduct,
);

export const selectloadingEditproduct= createSelector(
  [selectProduct],
  state => state.loadingEditproduct,
);

export const selectloadingRemoveproduct= createSelector(
  [selectProduct],
  state => state.removeproduct,
);