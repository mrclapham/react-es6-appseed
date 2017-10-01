import { combineReducers } from 'redux'
import footerReducer from './footer-reducer'
import headerReducer from './header-reducer'
import bikeCrimeReducer from './bikecrime-reducer' 
import bikeCrimeRetreivalStatus from './bikecrime-retreival-status-reducer'
import bikeCrimeFiltered from './bikecrime-filtered-reducer'

export default combineReducers({
  footer: footerReducer,
  header: headerReducer,
  bikeCrime: bikeCrimeReducer,
  bikeCrimeRetreivalStatus: bikeCrimeRetreivalStatus,
  bikeCrimeFiltered : bikeCrimeFiltered
}); 