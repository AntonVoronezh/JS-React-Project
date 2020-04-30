import React from 'react';
import {shallow} from 'enzyme';

import {HeaderElement} from './HeaderElement';

describe('<HeaderElement />', () => {
	let wrapper;

	beforeEach(() => (wrapper = shallow(<HeaderElement/>)));

	describe('component should render', () => {
		it('should be one nav', () => {
			expect(wrapper.find('nav')).toHaveLength(1);
		});
	});
});
