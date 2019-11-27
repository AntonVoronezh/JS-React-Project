import React from 'react';
import { shallow } from 'enzyme';

import { HeaderElementContainer } from './HeaderElementContainer';
import { HeaderElement } from '../../../components/elements/header-element/HeaderElement';

describe('<HeaderElementContainer />', () => {
	let wrapper;
	const props = {};

	beforeEach(() => (wrapper = shallow(<HeaderElementContainer {...props} />)));

	it('component should render', () => {
		expect(wrapper.find(HeaderElement)).toHaveLength(1);
	});
});
