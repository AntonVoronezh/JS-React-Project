import React from 'react';
import { render, shallow } from 'enzyme';
import { Icon } from '@fortawesome/free-solid-svg-icons';

import { Navigation } from './navigation';

describe('function createNavigation', () => {
	const mockLinks = {
		mainNav: [
			{
				to: '/',
				title: 'navigation.main',
				icon: Icon,
			},
		],
	};

	it('should be one nav', () => {
		let wrapper = shallow(<Navigation arrLinks={mockLinks.mainNav} />);
		expect(wrapper).toMatchSnapshot();
	});
});
