import { UPDATE_FOOTER } from '../actions/constants'

/*
 The state argument is the state the reducer is responsible for - not the application state.
 It is passed back to itself as an argument.
 */
export default (state = "Default footer text", action = {type:null, payload:null} ) => {

    switch (action.type) {
        case UPDATE_FOOTER:
            return action.payload;
            break;
        default:
            return state;
    }
};