import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './root';

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
  sagaMiddleware,
];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});
sagaMiddleware.run(rootSaga);
// Store HMR
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./root', () => {
    import('./root').then(module => {
      store.replaceReducer(module.default);
    });
  });
}
export default store;
// The store has been created with these options:
// - The slice reducers were automatically passed to combineReducers()
// - redux-thunk and redux-logger were added as middleware
// - The Redux DevTools Extension is disabled for production
// - The middleware, batch, and devtools enhancers were automatically composed together
