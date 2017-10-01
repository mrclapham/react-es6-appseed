import { updateHeader, updateFooter, filterBikeData, filterBikeDataRoot } from "./actions"
import { UPDATE_HEADER, FILTER_BIKE_DATA } from './constants'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { bikeCrime } from '../mockdata'

describe('actions', () => {
    describe('Update header', () => {
        it("Has the correct type", () => {
            const action = updateHeader()
            expect(action.type).toEqual(UPDATE_HEADER);
        });
        it("Has the correct payload", () => {
            const action = updateHeader('New heading');
            expect(action.payload).toEqual('New heading');
        })
    });
/*

*/
    describe("filterBikeData - an Actions containing business logic - return an item with a specific ID.", () => {
        const revisedData = Object.assign({}, { header: "header value", bikeCrime: bikeCrime.incidents })
        const store = configureStore([thunk])(revisedData);
        store.dispatch(filterBikeDataRoot("id", 77828));
        const action = store.getActions().find(a => a.type === FILTER_BIKE_DATA);

        it('Should only return the item with an id of 77828', () => {
            expect(action.payload.length).toEqual(1);
            expect(action.payload[0].id).toEqual(77828);
        })
    });

    describe("filterBikeData - an Actions containing business logic - return an Array of items with the same address.", () => {
        const revisedData = Object.assign({}, { header: "header value", bikeCrime: bikeCrime.incidents })
        const store = configureStore([thunk])(revisedData);
        const address = "London, EC1R 3AL, GB"
        
        store.dispatch(filterBikeDataRoot("address", address));
        const action = store.getActions().find(a => a.type === FILTER_BIKE_DATA);

        it('Should return the three items with the address "London, EC1R 3AL, GB".', () => {
            expect(action.payload.length).toEqual(3);
            expect(action.payload[0].address).toEqual(address);
            expect(action.payload[1].address).toEqual(address);
            expect(action.payload[2].address).toEqual(address);
        })
    });
});





