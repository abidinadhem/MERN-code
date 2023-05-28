import { createSelector } from "@reduxjs/toolkit";
import { initialState } from ".";

const selectSlice = (state) => state.ordersU || initialState;

const selectOrder = createSelector([selectSlice], (state) => state);

export const selectUsers= createSelector(
  [selectOrder],
  (state) => state.users
);

export const selectLoadingUsers = createSelector(
  [selectOrder],
  (state) => state.loadingUSer
);

export const selectproducts = createSelector(
  [selectOrder],
  (state) => state.products
);

export const selectLoading = createSelector(
  [selectOrder],
  (state) => state.loading
);

export const selectOrderItems = createSelector(
  [selectOrder],
  (state) => state.orderItems
);

export const selectLoadingAddOrder = createSelector(
  [selectOrder],
  (state) => state.loadingaddOrder
);

export const selectTotal = createSelector(
  [selectOrder],
  (state) => state.total
);

export const selectGetOrders = createSelector(
  [selectOrder],
  (state) => state.orders
);

export const selectLoadinggetOrder = createSelector(
  [selectOrder],
  (state) => state.loadingGetOrders
);
