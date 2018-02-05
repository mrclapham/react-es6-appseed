import { combineReducers } from 'redux'
import bikeCrimeReducer from './bikecrime-reducer' 
import bikeCrimeRetreivalStatus from './bikecrime-retreival-status-reducer'
import bikeCrimeFiltered from './bikecrime-filtered-reducer'

export default combineReducers({
    bikeCrime: bikeCrimeReducer,
    bikeCrimeRetreivalStatus: bikeCrimeRetreivalStatus,
    bikeCrimeFiltered : bikeCrimeFiltered
  }); 