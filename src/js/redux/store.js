import reducersIndex from './reducers/reducers-index'
import { createStore } from 'redux'

/* eslint-disable no-underscore-dangle */
  const store = createStore(
   reducersIndex, /* preloadedState, */
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
/* eslint-enable */