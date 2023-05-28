import { all } from 'redux-saga/effects';
import { loginSagaWatcher } from '../routes/unAuthRoutes/login/slice/saga';
import { usersSagaWatcher } from '../routes/authRouters/users/slice/saga';
import { productsSagaWatcher } from '../routes/authRouters/products/slice/saga';
import { ordersSagaWatcher } from '../routes/authRouters/orders/slice/saga';
import { ordersUSagaWatcher } from '../routes/unAuthRoutes/Home/slice/saga';

export function* rootSaga() {
  yield all([
    loginSagaWatcher(),
    ordersUSagaWatcher(),
    usersSagaWatcher(),
    ordersSagaWatcher(),
    productsSagaWatcher()
  ]);
}
