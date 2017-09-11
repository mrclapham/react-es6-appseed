import { BIKE_DATA_REQUESTED, BIKE_DATA_RECEIVED, BIKE_DATA_ERROR } from '../actions/constants'

/*
 The state argument is the state the reducer is responsible for - not the application state.
 It is passed back to itself as an argument.
 */
export default (state = [], action = { type: null, payload: null }) => {

    switch (action.type) {
        case BIKE_DATA_REQUESTED:
            return [];
            break;
        case BIKE_DATA_ERROR:
            return []
            break;
        case BIKE_DATA_RECEIVED:
            return action.payload
            break;
        default:
            return state;
    }
};