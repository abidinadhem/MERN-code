import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from '../routes/unAuthRoutes/login/slice';
import userReducer from '../routes/authRouters/users/slice';
import productsReducer from '../routes/authRouters/products/slice';
import ordersReducer from '../routes/authRouters/orders/slice';
import ordersUReducer from '../routes/unAuthRoutes/Home/slice';

import { rootSaga } from './rootSaga';

export function configueAppStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];

  const store = configureStore({
    reducer: {
      auth: authReducer,
      users:userReducer,
      orders: ordersReducer,
      ordersU: ordersUReducer,
      products: productsReducer
    },
    middleware: [...middlewares],
  });

  sagaMiddleware.run(rootSaga);

  return store;
}
