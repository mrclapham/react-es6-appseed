import { updateHeader, updateFooter } from "./update-header-actions"
import { UPDATE_HEADER } from './constants'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { bikeCrime } from '../mockdata'

let store;

// beforeEach(() => {
//     store = configureStore([thunk])(state);
// });

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
});


describe("Test a function which dispatches Actions within the function.", () => {

    const revisedData = Object.assign({}, bikeCrime)

    store = configureStore([thunk], revisedData);
    store.dispatch(setExportMenuFunctions(actionArray2));
    const action = store.getActions().find(a => a.type === UPDATE_EXPORT_MENU_DATA);
    it('Should update the Export Menu data correctly, when PDF productType does not exist', () => {
        expect(action.payload.menuItems.length).toEqual(2111);
    })
});