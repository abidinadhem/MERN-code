import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: "idle",
  users: [],
  loadingAddUser: "idle",
  loadingEditUser: "idle",
  getEditUser: "idle",
  removeUser: "idle",
  editUser: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    users(state, action) {
      state.removeUser = "idle";
      state.loadingAddUser = "idle";
      state.loadingEditUser = "idle";
      state.loading = "loading";
    },
    setUsersSuccess(state, action) {
      state.users = action.payload;
      state.loading = "done";
    },
    setUsersError(state, action) {
      state.users = [];
      state.loading = "error";
    },
    loadingAddUser(state, action) {
      state.loadingAddUser = "loading";
    },
    setLoadingAddUserSuccess(state, action) {
      state.loadingAddUser = "done";
    },
    setLoadingAddUserError(state, action) {
      state.loadingAddUser = "error";
    },
    loadingEditUser(state, action) {
      state.loadingEditUser = "loading";
    },
    setLoadingEditUserSuccess(state, action) {
      state.loadingEditUser = "done";
    },
    setLoadingEditUserError(state, action) {
      state.loadingEditUser = "error";
    },
    loadingRemoveUser(state, action) {
      state.removeUser = "loading";
    },
    setLoadingRemoveUserSuccess(state, action) {
      state.removeUser = "done";
    },
    setLoadingRemoveUserError(state, action) {
      state.removeUser = "error";
    },
    setEditUser(state, action) {
      state.getEditUser = "loading";
    },
    setEditUserSuccess(state, action) {
      state.getEditUser = "done";
      state.editUser = action.payload;
    },
    setEditUserError(state, action) {
      state.getEditUser = "error";
      state.editUser = null;
    },
  },
});

export const { actions: usersActions, reducer } = usersSlice;

export default usersSlice.reducer;
