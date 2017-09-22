import reducersIndex from './reducers/reducers-index'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

/* eslint-disable no-underscore-dangle */
  export const store = createStore(
   reducersIndex, /* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
   applyMiddleware(thunk)
  );

/* eslint-enable */