import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: 'idle',
  appLoading: 'idle',
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    init(state, action) {
      state.appLoading = 'loading';
    },
    setinitAuthSuccess(state, action) {
      state.user = action.payload;
      state.appLoading = 'done';
    },
    setinitUnAuthSuccess(state, action) {
      state.user = null;
      state.appLoading = 'done';
    },
    setinitError(state, action) {
      state.appLoading = 'error';
    },
    login(state, action) {
      state.loading = 'loading';
    },
    setloginSuccess(state, action) {
      state.user = action.payload;
      state.loading = 'done';
    },
    setloginError(state, action) {
      state.loading = 'error';
    },
    logout(state, action) {
    },
    setlogoutSuccess(state, action) {
      state.user = null;
    },
  },
});

export const { actions: authActions, reducer } = authSlice;

export default authSlice.reducer;
