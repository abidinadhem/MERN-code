import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: 'idle',
  products: [],
  loadingAddproduct: "idle",
  loadingEditproduct: "idle",
  getEditproduct: "idle",
  removeproduct: "idle",
  editproduct: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    products(state, action) {
      state.loadingAddproduct = "idle";
      state.loadingEditproduct = "idle";
      state.getEditproduct = "idle";
      state.removeproduct = "idle";
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
    loadingAddproduct(state, action) {
      state.loadingAddproduct = "loading";
    },
    setLoadingAddproductSuccess(state, action) {
      state.loadingAddproduct = "done";
    },
    setLoadingAddproductError(state, action) {
      state.loadingAddproduct = "error";
    },
    loadingEditproduct(state, action) {
      state.loadingEditproduct = "loading";
    },
    setLoadingEditproductSuccess(state, action) {
      state.loadingEditproduct = "done";
    },
    setLoadingEditproductError(state, action) {
      state.loadingEditproduct = "error";
    },
    loadingRemoveproduct(state, action) {
      state.removeproduct = "loading";
    },
    setLoadingRemoveproductSuccess(state, action) {
      state.removeproduct = "done";
    },
    setLoadingRemoveproductError(state, action) {
      state.removeproduct = "error";
    },
    setEditproduct(state, action) {
      state.getEditproduct = "loading";
    },
    setEditproductSuccess(state, action) {
      state.getEditproduct = "done";
      state.editproduct = action.payload;
    },
    setEditproductError(state, action) {
      state.getEditproduct = "error";
      state.editproduct = null;
    },
  },
});

export const { actions: productsActions, reducer } = productsSlice;

export default productsSlice.reducer;
