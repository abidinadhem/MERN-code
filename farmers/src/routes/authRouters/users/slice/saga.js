import { put, takeLatest } from "redux-saga/effects";
import { usersActions as actions } from ".";
import axios from "axios";

export function* users(action) {
  try {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const obj = action.payload.filters;
    const columns = Object.keys(obj).reduce((memo, elem) => {
      if (obj[elem].toString().length > 0) {
        memo = {
          ...memo,
          [elem]: obj[elem],
        };
      }
      return memo;
    }, {});

    const params = {
      page: action.payload.current,
      ...columns,
    };
    const { data } = yield axios.get(`http://localhost:3200/user`, {
      headers,
      params,
    });
    yield put(actions.setUsersSuccess(data));
  } catch (err) {
    yield put(actions.setUsersError(err));
  }
}

export function* loadingAddUser(action) {
  try {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    yield axios.post(`http://localhost:3200/user/` , action.payload, {
      headers,
    });
    yield put(actions.setLoadingAddUserSuccess("data"));
  } catch (err) {
    yield put(actions.setLoadingAddUserError(err));
  }
}

export function* loadingEditUser(action) {
  try {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    yield axios.put(`http://localhost:3200/user/` + action.payload._id,action.payload, {
      headers,
    });
    yield put(actions.setLoadingEditUserSuccess("data"));
  } catch (err) {
    yield put(actions.setLoadingEditUserError(err));
  }
}

export function* loadingRemoveUser(action) {
  try {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    yield axios.delete(`http://localhost:3200/user/` + action.payload, {
      headers,
    });
    yield put(actions.setLoadingRemoveUserSuccess("data"));
  } catch (err) {
    yield put(actions.setLoadingRemoveUserError(err));
  }
}

export function* setEditUser(action) {
  try {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const { data } = yield axios.get(
      `http://localhost:3200/user/` + action.payload,
      { headers }
    );
    yield put(actions.setEditUserSuccess(data));
  } catch (err) {
    yield put(actions.setEditUserError(err));
  }
}

export function* usersSagaWatcher() {
  yield takeLatest(actions.users.type, users);
  yield takeLatest(actions.loadingAddUser.type, loadingAddUser);
  yield takeLatest(actions.setEditUser.type, setEditUser);
  yield takeLatest(actions.loadingEditUser.type, loadingEditUser);
  yield takeLatest(actions.loadingRemoveUser.type, loadingRemoveUser);
}
