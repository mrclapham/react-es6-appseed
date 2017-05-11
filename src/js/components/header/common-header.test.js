/**
 * Created by grahamclapham on 19/07/16.
 */
import React from 'react';
import { shallow } from 'enzyme';

import ReactHeader from './common-header.js';


describe('ReactHeader', function () {
    it('renders children when passed in', () => {
        const wrapper = shallow(<ReactHeader />);
        const inst = wrapper.instance();
        expect(inst instanceof ReactHeader).toEqual(true);
        expect(wrapper.contains(["This is the default headline"])).toEqual(true);

        });
    });




