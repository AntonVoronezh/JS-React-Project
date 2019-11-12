import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { RouteWithSubRoutes } from './RouteWithSubRoutes';

const MockIndex = () => <div>{2 + 3}</div>;
const MockModels = () => <div>{2 + 3}</div>;

const mockRoute = [
	{
		path: '/',
		exact: true,
		component: MockIndex,
	},
	{
		path: '/models',
		component: MockModels,
	},
];

describe('HOC <RouteWithSubRoutes />', () => {
	let wrapper, ComposedComponent;

	describe('Rendering UI', () => {
		it('component should render index page', () => {
			ComposedComponent = RouteWithSubRoutes(mockRoute[0]);
			wrapper = mount(<MemoryRouter initialEntries={['/']}>{ComposedComponent}</MemoryRouter>);

			expect(wrapper.find(MockIndex)).toHaveLength(1);
		});

		it('component should render category page', () => {
			ComposedComponent = RouteWithSubRoutes(mockRoute[1]);
			wrapper = mount(<MemoryRouter initialEntries={['/models']}>{ComposedComponent}</MemoryRouter>);

			expect(wrapper.find(MockModels)).toHaveLength(1);
		});
	});
});
