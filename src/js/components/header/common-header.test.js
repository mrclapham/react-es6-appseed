/**
 * Created by grahamclapham on 19/07/16.
 */
import React from 'react';
import { shallow } from 'enzyme';
import ReactHeader from './common-header.js';


describe('ReactHeader', function () {
    it('renders a default header with default text', () => {
        const wrapper = shallow(<ReactHeader />);
        const inst = wrapper.instance();
        expect(inst instanceof ReactHeader).toEqual(true);
        expect(wrapper.contains(["The default headline."])).toEqual(true);
    });
    
    it('renders a default header with default text', () => {
        const wrapper = shallow(<ReactHeader headline={"new headline"} />);
        const inst = wrapper.instance();
        expect(wrapper.contains(["new headline"])).toEqual(true);
        });
    });




