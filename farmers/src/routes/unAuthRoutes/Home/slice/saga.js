import { put, takeLatest } from "redux-saga/effects";
import { ordersActions as actions } from ".";
import axios from "axios";

export function* products(action) {
  try {
    const { data } = yield axios.get(`http://localhost:3200/product/all`);
    yield put(actions.setproductsSuccess(data.data));
  } catch (err) {
    yield put(actions.setproductsError(err));
  }
}

export function* users(action) {
  try {
    const { data } = yield axios.get(`http://localhost:3200/user?pageSize=99999`);

    yield put(actions.setUsersSuccess(data.data));
  } catch (err) {
    yield put(actions.setUsersError(err));
  }
}

export function* addOrderItems(action) {
  try {
    const data = action.payload;
    let total = 0;
    let orderData = null;
    if (localStorage.getItem("order")) {
      orderData = JSON.parse(localStorage.getItem("order"));
      orderData.push({
        quantity: 1,
        product: data,
      });
      total = orderData.reduce((memo, elem) => {
        memo += elem.quantity * Number(elem.product.price);
        return memo;
      }, 0);
      localStorage.setItem("order", JSON.stringify(orderData));
      localStorage.setItem("total", JSON.stringify(total));
      yield put(actions.addOrderItemsSuccess({ orderItems: orderData, total }));
    } else {
      const query = {
        quantity: 1,
        product: data,
      };
      total = total + Number(data.price);
      orderData = [query];
      localStorage.setItem("order", JSON.stringify(orderData));
      localStorage.setItem("total", JSON.stringify(total));
    }
    yield put(actions.addOrderItemsSuccess({ orderItems: orderData, total }));
  } catch (err) {
    yield put(actions.addOrderItemsSuccess(null));
  }
}

export function* changeOrderItems(action) {
  const { item, key } = action.payload;
  if (localStorage.getItem("order")) {
    const orderItems = JSON.parse(localStorage.getItem("order"));
    let updatedOrderItems = [];
    orderItems.map((elem) => {
      if (elem.product._id === item._id) {
        if (key === "+") {
          if(elem.quantity + 1 <= elem.product.quantity) {
            updatedOrderItems.push({
              quantity: elem.quantity + 1,
              product: elem.product,
            });
          }else {
            updatedOrderItems.push({
              quantity: elem.quantity,
              product: elem.product,
            });
            alert('no enough quantity')
          }
         
        } else {
          let quantity = elem.quantity - 1
          if(quantity !== 0) {
            updatedOrderItems.push({
              quantity,
              product: elem.product,
            });
          }
        }
      } else {
        updatedOrderItems.push(elem)
      }
    });
    let total = updatedOrderItems.reduce((memo, elem) => {
      memo += elem.quantity * Number(elem.product.price);
      return memo;
    }, 0);
    localStorage.setItem("order", JSON.stringify(updatedOrderItems));
    localStorage.setItem("total", JSON.stringify(total));
    yield put(actions.changeOrderItemsSuccess({ orderItems: updatedOrderItems, total }));
  }
  //yield put(actions.changeOrderItemsSuccess({ orderItems: orderData, total }));
}

export function* initOrderItems(action) {
  try {
    let total = 0;
    let orderData = [];
    if (localStorage.getItem("order")) {
      orderData = JSON.parse(localStorage.getItem("order"));
      total = Number(localStorage.getItem("total"));
    } 
    yield put(actions.addOrderItemsSuccess({ orderItems: orderData, total }));
  } catch (err) {
    yield put(actions.addOrderItemsSuccess(null));
  }
}

export function* addOrder(action) {
  try {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    let query = {
      user: null,
      totalPrice: localStorage.getItem('total')
    }
    query.items = action.payload.map(key =>({
      product : key.product._id,
      quantity: key.quantity,
      price : key.quantity * key.product.price
    }))

    yield axios.post(`http://localhost:3200/order` , query, {
      headers,
    });
    localStorage.removeItem('total');
    localStorage.removeItem('order');
    yield put(actions.addOrderItemsSuccess({ orderItems: [], total : 0 }));

    yield put(actions.addOrderSuccess("data"));
  } catch (err) {
    yield put(actions.addOrderError(err));
  }
}

export function* orders(action) {
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
      ...columns
    };
    const { data } = yield axios.get(
      `http://localhost:3200/order`,
      {headers,params}
    );
    yield put(actions.setOrderSuccess(data));
  } catch (err) {
    yield put(actions.setOrderError(err));
  }
}

export function* ordersUSagaWatcher() {
  yield takeLatest(actions.products.type, products);
  yield takeLatest(actions.users.type, users);
  yield takeLatest(actions.orders.type, orders);
  yield takeLatest(actions.addOrderItems.type, addOrderItems);
  yield takeLatest(actions.addOrder.type, addOrder);
  yield takeLatest(actions.changeOrderItems.type, changeOrderItems);
  yield takeLatest(actions.initOrderItems.type, initOrderItems);
}
