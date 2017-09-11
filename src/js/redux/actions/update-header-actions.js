import { UPDATE_HEADER, UPDATE_FOOTER } from './constants';
import { BIKE_DATA_REQUESTED, BIKE_DATA_RECEIVED, BIKE_DATA_ERROR } from './constants';
import axios from "axios";

export const updateHeader = (value) => {
    return {type: UPDATE_HEADER, payload: value }
}

export const updateFooter = (value) => {
    return {type: UPDATE_FOOTER, payload: value }
}

export const getBikeData = () =>{
    /*
    https://www.bikewise.org/documentation/api_v2#!/incidents/GET_version_incidents_format_get_0
    */

const url = "https://bikewise.org:443/api/v2/incidents?page=1"
axios.get(url, {
    params: {
        proximity: "51.5518, 0.0646",
        proximity_square: 300
    }
  })
  .then(function (response) {
    console.log(response.data.incidents);
  })
  .catch(function (error) {
    console.log(error);
  });

}

export const onBikeDataReceived = (value) =>{
    return {type: BIKE_DATA_RECEIVED, payload: value }    
}

export const onBikeDataError = (value) =>{
    return {type: BIKE_DATA_ERROR, payload: value }    
}