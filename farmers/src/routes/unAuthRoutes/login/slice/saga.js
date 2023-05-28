import { put, takeLatest } from "redux-saga/effects";
import { authActions as actions } from ".";
import jwt_decode from "jwt-decode";
import axios from "axios";

export function* login(action) {
  try {
    const { data } = yield axios.post(
      "http://localhost:3200/user/login",
      action.payload
    );
    const decodedToken = jwt_decode(data.token);
    const { data: user } = yield axios.get(
      `http://localhost:3200/user/${decodedToken.id}`,
      { headers: { Authorization: 'Bearer ' + data.token } }
    );
    localStorage.setItem("token", data.token);
    localStorage.setItem("userID", decodedToken.id);
    yield put(actions.setloginSuccess(user)); //dispatch to login success action
  } catch (err) {
    yield put(actions.setloginError(err));
  }
}

export function* init(action) {
  try {
    if (localStorage.getItem("token")) {
      const decodedToken = jwt_decode(localStorage.getItem("token"));
      localStorage.setItem("token", localStorage.getItem("token"));
      localStorage.setItem("userID", decodedToken.id);
      const { data } = yield axios.get(
        `http://localhost:3200/user/${decodedToken.id}`,
        { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } }
      );
      yield put(actions.setinitAuthSuccess(data)); //dispatch to login success action
    } else {
      localStorage.clear();
      yield put(actions.setinitUnAuthSuccess()); //dispatch to login success action
    }
  } catch (err) {
    localStorage.clear();
    yield put(actions.setinitError(err));
  }
}

export function* logout(action) {
    localStorage.clear()
    yield put(actions.setlogoutSuccess());

}

export function* loginSagaWatcher() {
  yield takeLatest(actions.login.type, login);
  yield takeLatest(actions.init.type, init);
  yield takeLatest(actions.logout.type, logout);
}
