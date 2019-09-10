<<<<<<< HEAD
import { createStore, applyMiddleware } from 'redux';
=======
import { createStore, applyMiddleware, compose } from 'redux';
>>>>>>> implement show page
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  return {
<<<<<<< HEAD
    ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
=======
    ...createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(sagaMiddleware))
    ),
>>>>>>> implement show page
    runSaga: sagaMiddleware.run(rootSaga)
  };
};

export default configureStore;
