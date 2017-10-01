import { UPDATE_HEADER, UPDATE_FOOTER } from './constants';
import { BIKE_DATA_REQUESTED, BIKE_DATA_RECEIVED, BIKE_DATA_ERROR, FILTER_BIKE_DATA } from './constants';
import axios from "axios";

export const updateHeader = (value) => {
    return { type: UPDATE_HEADER, payload: value }
}

export const updateFooter = (value) => {
    return { type: UPDATE_FOOTER, payload: value }
}

export const onBikeDataReceived = (value) => {
    return { type: BIKE_DATA_RECEIVED, payload: value }
}

export const onBikeDataRequested = (value) => {
    return { type: BIKE_DATA_REQUESTED, payload: value }
}

export const onBikeDataError = (value) => {
    return { type: BIKE_DATA_ERROR, payload: value }
}
/*
    This is an action which adds some business logic.
    It returns a function, which is passed the "dispatch" and "getState" methods of the "store"
    as arguments.
    Using the thunk middleware the function is invoked and the dispatched value returned
*/
export const filterBikeDataRoot = (property, value) => {
    return (dispatch, getState) => {
        const { bikeCrime } = getState();
        const filteredData = bikeCrime.filter((d)=>{
            return String(d[property]) === String(value)
        })
        dispatch(filterBikeDataDispatch(filteredData))
    }
}

export const filterBikeDataDispatch = (value) => {
    return { type: FILTER_BIKE_DATA, payload: value }
}

export const getBikeData = () => {
    /*
    Bike data from:
    https://www.bikewise.org/documentation/api_v2#!/incidents/GET_version_incidents_format_get_0
    */
    return (dispatch, getState) => {
        dispatch(onBikeDataRequested("requested"));
        const url = "https://bikewise.org:443/api/v2/incidents?page=1"
        axios.get(url, {
            params: {
                proximity: "51.5518, 0.0646",
                proximity_square: 300
            }
        })
            .then(function (response) {
                dispatch(onBikeDataReceived(response.data.incidents))
            })
            .catch(function (error) {
                //console.log(error);
                dispatch(onBikeDataError(error))
                return error
            });
    }
}