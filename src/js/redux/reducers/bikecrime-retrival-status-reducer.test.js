import bikecrimeRetreivalStatusReducer from './bikecrime-retreival-status-reducer';
import { BIKE_DATA_REQUESTED, BIKE_DATA_RECEIVED, BIKE_DATA_ERROR  } from '../actions/constants';

describe("bikecrime-filtered-reducer", ()=>{
    it("Handles an unknown type.", ()=>{
        expect( bikecrimeRetreivalStatusReducer() ).toEqual("data not requested");
    });
    it("Handles action of type BIKE_DATA_REQUESTED.", ()=>{
        const action = {type:BIKE_DATA_REQUESTED}
        expect(bikecrimeRetreivalStatusReducer("",action)).toEqual("data requested");
    });

    it("Handles action of type BIKE_DATA_ERROR.", ()=>{
        const action = {type:BIKE_DATA_RECEIVED}
        expect(bikecrimeRetreivalStatusReducer("",action)).toEqual("data received");
    });

    it("Handles action of type BIKE_DATA_RECEIVED.", ()=>{
        const action = {type: BIKE_DATA_ERROR}
        expect(bikecrimeRetreivalStatusReducer("",action) ).toEqual("data error");
    });
});