import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: 'idle',
  loadingUSer : 'idle',
  users: [],
  loadingaddOrder: 'idle',
  products: [],
  orderItems: [],
  orders: [],
  loadingGetOrders : 'idle',
  total : 0
};

const ordersSlice = createSlice({
  name: 'ordersU',
  initialState,
  reducers: {
    orders(state, action) {
      state.loadingGetOrders = 'loading';
    },
    setOrderSuccess(state, action) {
      state.orders = action.payload;
      state.loadingGetOrders = 'done';
    },
    setOrderError(state, action) {
      state.orders = [];
      state.loadingGetOrders = 'error';
    },
    users(state, action) {
      state.loadingUSer = 'loading';
    },
    setUsersSuccess(state, action) {
      state.users = action.payload;
      state.loadingUSer = 'done';
    },
    setUsersError(state, action) {
      state.users = [];
      state.loadingUSer = 'error';
    },
    products(state, action) {
      state.loading = 'loading';
    },
    setproductsSuccess(state, action) {
      state.products = action.payload;
      state.loading = 'done';
    },
    setproductsError(state, action) {
      state.products = [];
      state.loading = 'error';
    },
    addOrder(state, action) {
      state.loadingaddOrder = 'loading';
    },
    addOrderSuccess(state, action) {
      state.loadingaddOrder = 'done';
    },
    addOrderError(state, action) {
      state.loadingaddOrder = 'error';
    },
    initOrderItems(state, action) {
    },
    initOrderItemsSuccess(state, action) {
      state.orderItems = action.payload.orderItems;
      state.total = action.payload.total;
    },
    addOrderItems(state, action) {
    },
    addOrderItemsSuccess(state, action) {
      state.orderItems = action.payload.orderItems;
      state.total = action.payload.total;
    },
    changeOrderItems(state, action) {
    },
    changeOrderItemsSuccess(state, action) {
      state.orderItems = action.payload.orderItems;
      state.total = action.payload.total;
    },
  },
});

export const { actions: ordersActions, reducer } = ordersSlice;

export default ordersSlice.reducer;
