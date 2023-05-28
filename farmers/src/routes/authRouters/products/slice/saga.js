import { put, takeLatest } from "redux-saga/effects";
import { productsActions as actions } from ".";
import axios from "axios";

export function* products(action) {
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
    const user = localStorage.getItem("userID")
    const params = {
      page: action.payload.current,
      user,
      ...columns
    };
    const { data } = yield axios.get(
      `http://localhost:3200/product`,
      {headers,params}
    );
    yield put(actions.setproductsSuccess(data));
  } catch (err) {
    yield put(actions.setproductsError(err));
  }
}

export function* loadingAddproduct(action) {
  try {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    yield axios.post(`http://localhost:3200/product/` ,action.payload, {
      headers,
    });
    yield put(actions.setLoadingAddproductSuccess("data"));
  } catch (err) {
    yield put(actions.setLoadingAddproductError(err));
  }
}

export function* loadingEditproduct(action) {
  try {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    yield axios.put(`http://localhost:3200/product/` + action.payload._id,action.payload, {
      headers,
    });
    yield put(actions.setLoadingEditproductSuccess("data"));
  } catch (err) {
    yield put(actions.setLoadingEditproductError(err));
  }
}

export function* loadingRemoveproduct(action) {
  try {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    yield axios.delete(`http://localhost:3200/product/` + action.payload, {
      headers,
    });
    yield put(actions.setLoadingRemoveproductSuccess("data"));
  } catch (err) {
    yield put(actions.setLoadingRemoveproductError(err));
  }
}

export function* setEditproduct(action) {
  try {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const { data } = yield axios.get(
      `http://localhost:3200/product/` + action.payload,
      { headers }
    );
    yield put(actions.setEditproductSuccess(data));
  } catch (err) {
    yield put(actions.setEditproductError(err));
  }
}

export function* productsSagaWatcher() {
  yield takeLatest(actions.products.type, products);
  yield takeLatest(actions.loadingAddproduct.type, loadingAddproduct);
  yield takeLatest(actions.setEditproduct.type, setEditproduct);
  yield takeLatest(actions.loadingEditproduct.type, loadingEditproduct);
  yield takeLatest(actions.loadingRemoveproduct.type, loadingRemoveproduct);
}
