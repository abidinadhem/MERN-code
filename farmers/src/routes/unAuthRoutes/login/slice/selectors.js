import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';

const selectSlice = state => state.auth || initialState;

const selectauth = createSelector([selectSlice], state => state);

export const selectuser = createSelector(
  [selectauth],
  state => state.user,
);

export const selectLoading = createSelector(
  [selectauth],
  state => state.loading,
);

export const selectAppLoading= createSelector(
  [selectauth],
  state => state.appLoading,
);