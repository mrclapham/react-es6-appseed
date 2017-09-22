import { updateHeader, updateFooter, filterBikeData, filterBikeDataRoot } from "./update-header-actions"
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

    describe("filterBikeData - an Actions cotaining business logic.", () => {

    const revisedData = Object.assign({}, {header:"header value", bikeCrime:bikeCrime})
    const store = configureStore([thunk])(revisedData);
    store.dispatch(filterBikeDataRoot("id", 77828));
    const action = store.getActions().find(a => a.type === FILTER_BIKE_DATA);

    it('Should only return the item with an id of 77828', () => {
        expect(action.payload.length).toEqual(1);
    })
});

    // describe('filterBikeData', () => {
    //     it("Has the correct type", () => {
    //         const action = filterBikeData()
    //         expect(action.type).toEqual(FILTER_BIKE_DATA);
    //     });
    //     it("Has the correct payload", () => {
    //         const action = filterBikeData("id", 77828 );
    //         expect(action.payload.property).toEqual('id');
    //         expect(action.payload.value).toEqual(77828);
    //     })
    // });


});





