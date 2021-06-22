import createSagaMiddleware from 'redux-saga';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import HomeReducer from '../pages/home/homeSlice';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

// sagaMiddleware: Makes redux-sagas work
const middlewares = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    home: HomeReducer,
  },
  middleware: [...getDefaultMiddleware({ thunk: false }), ...middlewares],
});

sagaMiddleware.run(rootSaga);
