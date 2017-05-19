import HeaderReducer from './header-reducer';
import { UPDATE_HEADER } from '../actions/constants'

describe("header-reducer", ()=>{
    it("Handles an unknown type.", ()=>{
        expect( HeaderReducer() ).toEqual("Default header text from reducer");
    });
    it("Handles action of type UPADTE_HEADER.", ()=>{
        const action = {type:UPDATE_HEADER,  payload: "Revised header"}
        expect(HeaderReducer("",action)).toEqual("Revised header");
    });
});