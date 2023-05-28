import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';

const selectSlice = state => state.users || initialState;

const selectUser = createSelector([selectSlice], state => state);

export const selectusers = createSelector(
  [selectUser],
  state => state.users,
);

export const selectLoading = createSelector(
  [selectUser],
  state => state.loading,
);

export const selectloadingAddUser = createSelector(
  [selectUser],
  state => state.loadingAddUser,
);

export const selectgetUser = createSelector(
  [selectUser],
  state => state.editUser,
);

export const selectLoadinggetUser = createSelector(
  [selectUser],
  state => state.getEditUser,
);

export const selectloadingEditUser= createSelector(
  [selectUser],
  state => state.loadingEditUser,
);

export const selectloadingRemoveUser= createSelector(
  [selectUser],
  state => state.removeUser,
);