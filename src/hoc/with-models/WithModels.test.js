import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { WithModels } from './WithModels';
import {Spinner} from '../../components/elements/spinner/Spinner';
import {SyncBtn222} from '../../components/elements/sync-btn/SyncBtn222';
import {FetchError} from '../../components/elements/fetch-error/FetchError';

const mountWithProvider = children => store => mount(<Provider store={store}>{children}</Provider>);

jest.mock('../../components/elements/sync-btn/SyncBtn');

describe('HOC <WithModels />', () => {
	let spy,
		wrapper,
		ComposedComponent,
		MockComponent = () => <div></div>;

	beforeAll(() => {
		
		ComposedComponent = WithModels(MockComponent);
		// console.log('-----------------',typeof ComposedComponent)
		console.log(ComposedComponent)
		// console.log(ComposedComponent.prototype)
		spy = jest.spyOn(ComposedComponent.prototype, 'componentDidMount');
		// jest.spyOn(ComposedComponent.prototype, 'componentDidMount');

	});

	// describe('Rendering UI', () => {
	// 	it('component should render one MockComponent', () => {
	// 		const defaultStore = {
	// 			models: {
	// 				modelsList: [],
	// 				errorMsg: null,
	// 			},
	// 		};
	// 		const mockedStore = configureMockStore()(defaultStore);

	// 		wrapper = mountWithProvider(<ComposedComponent />)(mockedStore);

	// 		expect(wrapper.find(MockComponent)).toHaveLength(1);
	// 	});

	// 	it('component should render render one Spinner when modelsList === null', () => {
	// 		const defaultStore = {
	// 			models: {
	// 				modelsList: null,
	// 				errorMsg: null,
	// 			},
	// 		};
	// 		const mockedStore = configureMockStore()(defaultStore);

	// 		wrapper = mountWithProvider(<ComposedComponent />)(mockedStore);

	// 		expect(wrapper.find(Spinner)).toHaveLength(1);
	// 	});

	// 	it('component should render one FetchError and one SyncBtn when errorMsg === null', () => {
	// 		const defaultStore = {
	// 			models: {
	// 				modelsList: [],
	// 				errorMsg: 'error',
	// 			},
	// 		};
	// 		const mockedStore = configureMockStore()(defaultStore);

	// 		wrapper = mountWithProvider(<ComposedComponent />)(mockedStore);

	// 		expect(wrapper.find(FetchError)).toHaveLength(1);
	// 		expect(wrapper.find(SyncBtn)).toHaveLength(1);
	// 	});
	// });

	describe('Check lifecycle methods', () => {

		it('component should call componentDidMount one time', () => {
			
			// ComposedComponent = WithModels(MockComponent);
			// const spy = jest.spyOn(ComposedComponent.prototype, 'componentDidMount');

			const defaultStore = {
				models: {
					modelsList: [],
					errorMsg: null,
				},
			};
			const mockedStore = configureMockStore()(defaultStore);
			// console.log(ComposedComponent.debug())
		
						wrapper = mountWithProvider(<ComposedComponent />)(mockedStore);
				// const spy = jest.spyOn(wrapper.instance().prototype, 'componentDidMount');
				// wrapper.update()
// console.log(wrapper.debug())
				// wrapper.update()
			// expect(spy).toHaveBeenCalledTimes(1);
			// const wrap = wrapper.find('Wrap')
			// expect(wrapper.find('Wrap')).toHaveLength(1);
			// expect(wrapper.find('Wrap')).toHaveLength(1);

			// expect(wrap.prototype.componentDidMount).toHaveBeenCalledTimes(1);
			// spy.mockClear();
			// spy.mockRestore();
			// jest.spyOn(ComposedComponent.prototype, 'componentDidMount');
		});
	});

	// describe('Check functionality', () => {lifecycle method
	// 	beforeAll(() => {
	// 		ComposedComponent = WithTranslation(MockComponent);
	// 		wrapper = mount(<ComposedComponent collapsed={false} />);
	// 		props = wrapper.find(MockComponent).props();
	// 	});

	// 	it('renders the MockComponent as the root element', () => {
	// 		expect(wrapper.first().is(MockComponent));
	// 	});

	// 	it('check function t', () => {
	// 		expect(typeof props.t).toBe('function');
	// 	});
	// });
});
