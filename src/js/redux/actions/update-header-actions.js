import { UPDATE_HEADER } from './constants';
import { UPDATE_FOOTER } from './constants';

export const updateHeader = (value) => {
    return {type: UPDATE_HEADER, payload: value }
}

export const updateFooter = (value) => {
    return {type: UPDATE_FOOTER, payload: value }
}