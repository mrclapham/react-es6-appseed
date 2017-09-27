import { FILTER_BIKE_DATA } from '../actions/constants'

/*
 The state argument is the state the reducer is responsible for - not the application state.
 It is passed back to itself as an argument.
 */
export default (state = [], action = { type: null, payload: [] }) => {
    console.log("ACTION :; ", action)
    switch (action.type) {
        case FILTER_BIKE_DATA:
            return action.payload;
            break;
            default :
            return state;
    }
};