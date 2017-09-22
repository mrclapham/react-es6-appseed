import bikecrimeReducer from './bikecrime-reducer';
import { BIKE_DATA_REQUESTED, BIKE_DATA_RECEIVED, BIKE_DATA_ERROR } from '../actions/constants';
import { bikeCrime } from '../mockdata';

describe("bikecrime-reducer", ()=>{
    it("Handles an unknown type.", ()=>{
        expect( bikecrimeReducer() ).toEqual([]);
    });
    it("Handles action of type BIKE_DATA_REQUESTED.", ()=>{
        const action = {type:BIKE_DATA_REQUESTED}
        expect(bikecrimeReducer("",action)).toEqual([]);
    });

    it("Handles action of type BIKE_DATA_ERROR.", ()=>{
        const action = {type:BIKE_DATA_ERROR}
        expect(bikecrimeReducer("",action)).toEqual([]);
    });

    it("Handles action of type BIKE_DATA_RECEIVED.", ()=>{
        const action = {type: BIKE_DATA_RECEIVED, payload: bikeCrime.incidents}
        expect(JSON.stringify( bikecrimeReducer("",action)) ).toEqual(JSON.stringify(bikeCrime.incidents));
    });
});