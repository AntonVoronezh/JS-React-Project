import React from 'react';
import { shallow } from 'enzyme';

import { FooterElementContainer } from './FooterElementContainer';
import { FooterElement } from '../../../components/elements/footer-element/FooterElement';

describe('<FooterElementContainer />', () => {
	let wrapper;
	const props = {
		status: 'ADD',
		syncNow: () => {},
	};

	beforeEach(() => (wrapper = shallow(<FooterElementContainer {...props} />)));

	it('component should render', () => {
		expect(wrapper.find(FooterElement)).toHaveLength(1);
	});
});
