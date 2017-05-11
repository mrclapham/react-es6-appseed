import {updateHeader, updateFooter } from "./update-header-actions"
import { UPDATE_HEADER } from './constants'

describe('actions', ()=>{
    describe('Update header', ()=>{
        it("Has the correct type", ()=>{
            const action = updateHeader()
            expect(action.type).toEqual(UPDATE_HEADER);
        });
        it("Has the correct payload", ()=>{
            const action = updateHeader('New heading');
            expect(action.payload).toEqual('New heading');
        })
    });
});