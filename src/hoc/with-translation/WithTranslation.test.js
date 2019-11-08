import React from 'react';
import { mount } from 'enzyme';

import { WithTranslation } from './WithTranslation';

describe('HOC <WithTranslation />', () => {
	let props,
		wrapper,
		ComposedComponent,
		MockComponent = () => <div></div>;

	describe('Rendering UI', () => {
		beforeAll(() => {
			ComposedComponent = WithTranslation(MockComponent);
			wrapper = mount(<ComposedComponent foo="foo" />);
			props = wrapper.find(MockComponent).props();
		});

		it('component should render one div', () => expect(wrapper.find('div')).toHaveLength(1));

		it('passes additional foo prop to composed component', () => expect(props.foo).toBe('foo'));
	});

	describe('Check functionality', () => {
		beforeAll(() => {
			ComposedComponent = WithTranslation(MockComponent);
			wrapper = mount(<ComposedComponent collapsed={false} />);
			props = wrapper.find(MockComponent).props();
		});

		it('renders the MockComponent as the root element', () => {
			expect(wrapper.first().is(MockComponent));
		});

		it('check function t', () => {
			expect(typeof props.t).toBe('function');
		});
	});
});
