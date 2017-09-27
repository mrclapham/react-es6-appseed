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

export const onBikeDataError = (value) => {
    return { type: BIKE_DATA_ERROR, payload: value }
}

export const filterBikeDataRoot = (property, value) => {
    console.log("filterBikeDataRoot ")
    return (dispatch, getState) => {
        const { bikeCrime } = getState();
        const filteredData = bikeCrime.filter((d)=>{
            return String(d[property]) === String(value)
        })
        dispatch(filterBikeDataDispatch(filteredData))
    }
}


export const filterBikeDataDispatch = (value) => {
    console.log("filterBikeDataDispatch -- ", value)
    return { type: FILTER_BIKE_DATA, payload: value }
}

export const getBikeData = () => {
    /*
    Bike data from:
    https://www.bikewise.org/documentation/api_v2#!/incidents/GET_version_incidents_format_get_0
    */
    return (dispatch, getState) => {
        const url = "https://bikewise.org:443/api/v2/incidents?page=1"
        axios.get(url, {
            params: {
                proximity: "51.5518, 0.0646",
                proximity_square: 300
            }
        })
            .then(function (response) {
                console.log(JSON.stringify(response.data.incidents));
                dispatch(onBikeDataReceived(response.data.incidents))
            })
            .catch(function (error) {
                console.log(error);
                return error
            });
    }
}