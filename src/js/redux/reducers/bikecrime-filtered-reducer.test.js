import bikecrimeFilteredReducer from './bikecrime-filtered-reducer';
import { FILTER_BIKE_DATA, BIKE_DATA_REQUESTED, BIKE_DATA_RECEIVED, BIKE_DATA_ERROR  } from '../actions/constants';
import { bikeCrime } from '../mockdata';

describe("bikecrime-filtered-reducer", ()=>{
    it("Handles an unknown type.", ()=>{
        expect( bikecrimeFilteredReducer() ).toEqual([]);
    });
    it("Handles action of type BIKE_DATA_REQUESTED.", ()=>{
        const action = {type:BIKE_DATA_REQUESTED}
        expect( bikecrimeFilteredReducer("",action) ).toEqual([]);
    });

    it("Handles action of type BIKE_DATA_ERROR.", ()=>{
        const action = {type:BIKE_DATA_ERROR}
        expect( bikecrimeFilteredReducer("",action) ).toEqual([]);
    });

    it("Handles action of type BIKE_DATA_RECEIVED.", ()=>{
        const action = {type: BIKE_DATA_RECEIVED, payload: bikeCrime.incidents}
        expect(JSON.stringify( bikecrimeFilteredReducer("",action)) ).toEqual(JSON.stringify(bikeCrime.incidents));
    });

    it("Handles action of type BIKE_DATA_RECEIVED.", ()=>{
        const action = {type: BIKE_DATA_RECEIVED, payload: bikeCrime.incidents}
        expect(JSON.stringify( bikecrimeFilteredReducer("",action)) ).toEqual(JSON.stringify(bikeCrime.incidents));
    });
});