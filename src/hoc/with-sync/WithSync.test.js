import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { WithSync } from './WithSync';
import dal from '../../helpers/libs/dal';

const mountWithProvider = children => store => mount(<Provider store={store}>{children}</Provider>);

jest.mock('../../helpers/libs/dal', () => {
	class DAL {
		setSync = () => jest.fn();
		startSync = () => jest.fn();
	}

	return new DAL();
});

describe('HOC <WithSync />', () => {
	let spy,
		wrapper,
		ComposedComponent,
		MockComponent = () => <div></div>;

	const defaultStore = {
		fields: {
			fieldsList: [],
			errorMsg: null,
		},
		models: {
			modelsList: [],
			errorMsg: null,
		},
		sync: { status: 'INIT' },
	};

	beforeAll(() => {
		ComposedComponent = WithSync(MockComponent);
		
	});

	afterEach(() => {
		jest.clearAllMocks();

	});

	describe('Rendering UI', () => {
		it('component should render one MockComponent', () => {
			const mockedStore = configureMockStore()(defaultStore);

			wrapper = mountWithProvider(<ComposedComponent />)(mockedStore);

			expect(wrapper.find(MockComponent)).toHaveLength(1);
		});

		describe('Check functionality', () => {
			it('component should call setSync one time', () => {
				const mockedStore = configureMockStore()(defaultStore);

				spy = jest.spyOn(dal, 'setSync');

				wrapper = mountWithProvider(<ComposedComponent />)(mockedStore);

				expect(spy).toBeCalledTimes(1);
			});
			it('component should call startSync two time', () => {
				const mockedStore = configureMockStore()(defaultStore);

				spy = jest.spyOn(dal, 'startSync');

				wrapper = mountWithProvider(<ComposedComponent />)(mockedStore);

				expect(spy).toBeCalledTimes(1);
			});

			it('component should call startSync one time', () => {
				const mockedStore = configureMockStore()(defaultStore);

				spy = jest.spyOn(dal, 'startSync');

				wrapper = mountWithProvider(<ComposedComponent />)(mockedStore);

				expect(spy).toBeCalledTimes(1);
			});

			it('component should delete timers after unmount', () => {
				const mockedStore = configureMockStore()(defaultStore);
				window.timerId = 1;
				wrapper = mountWithProvider(<ComposedComponent />)(mockedStore);

				wrapper.unmount();

				expect(window.timerId).toBe(undefined);
			});

			it('component should call updateLocal one time', () => {
				const mockedStore = configureMockStore()(defaultStore);

				spy = jest.spyOn(dal, 'startSync');

				wrapper = mountWithProvider(<ComposedComponent />)(mockedStore);
				wrapper.setProps({ children: <ComposedComponent fieldsList={[1]} /> });

				expect(spy).toHaveBeenCalledTimes(1);
			});
		});
	});
});
