import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { WithFields } from './WithFields';
import { Spinner } from '../../components/elements/spinner/Spinner';
import { SyncBtn } from '../../components/elements/sync-btn/SyncBtn';
import { FetchError } from '../../components/elements/fetch-error/FetchError';
import ui from '../../helpers/libs/ui';
import dal from '../../helpers/libs/dal';

const mountWithProvider = children => store => mount(<Provider store={store}>{children}</Provider>);

jest.mock('../../components/elements/sync-btn/SyncBtn');

jest.mock('../../helpers/libs/ui', () => {
	class UI {
		getData() {
			return jest.fn();
		}
		updateLocal() {
			return jest.fn();
		}
	}

	return new UI();
});

jest.mock('../../helpers/libs/dal', () => {
	class DAL {
		setSync() {
			return jest.fn();
		}
	}

	return new DAL();
});

describe('HOC <WithModels />', () => {
	let spy,
		wrapper,
		ComposedComponent,
		MockComponent = () => <div></div>;

	beforeAll(() => {
		ComposedComponent = WithFields(MockComponent);
	});

	describe('Check functionality', () => {
		it('component should call getData one time', () => {
			const defaultStore = {
				fields: {
					fieldsList: null,
					errorMsg: null,
				},
			};
			const mockedStore = configureMockStore()(defaultStore);

			spy = jest.spyOn(ui, 'getData');

			wrapper = mountWithProvider(<ComposedComponent />)(mockedStore);

			expect(spy).toBeCalledTimes(1);
		});

		it('component should call setSync one time', () => {
			const defaultStore = {
				fields: {
					fieldsList: null,
					errorMsg: null,
				},
			};
			const mockedStore = configureMockStore()(defaultStore);

			spy = jest.spyOn(dal, 'setSync');

			wrapper = mountWithProvider(<ComposedComponent />)(mockedStore);

			expect(spy).toBeCalledTimes(1);
		});

		it('component should call updateLocal one time', () => {
			const defaultStore = {
				fields: {
					fieldsList: null,
					errorMsg: null,
				},
			};
			const mockedStore = configureMockStore()(defaultStore);

			spy = jest.spyOn(ui, 'updateLocal');

			wrapper = mountWithProvider(<ComposedComponent />)(mockedStore);
			wrapper.setProps({ children: <ComposedComponent fieldsList={[]} /> });

			expect(spy).toHaveBeenCalledTimes(1);
		});
	});

	describe('Rendering UI', () => {
		it('component should render one MockComponent', () => {
			const defaultStore = {
				fields: {
					fieldsList: [],
					errorMsg: null,
				},
			};
			const mockedStore = configureMockStore()(defaultStore);

			wrapper = mountWithProvider(<ComposedComponent />)(mockedStore);

			expect(wrapper.find(MockComponent)).toHaveLength(1);
		});

		it('component should render render one Spinner when fieldsList === null', () => {
			const defaultStore = {
				fields: {
					fieldsList: null,
					errorMsg: null,
				},
			};
			const mockedStore = configureMockStore()(defaultStore);

			wrapper = mountWithProvider(<ComposedComponent />)(mockedStore);

			expect(wrapper.find(Spinner)).toHaveLength(1);
		});

		it('component should render one FetchError and one SyncBtn when errorMsg === null', () => {
			const defaultStore = {
				fields: {
					fieldsList: [],
					errorMsg: 'error',
				},
			};
			const mockedStore = configureMockStore()(defaultStore);

			wrapper = mountWithProvider(<ComposedComponent />)(mockedStore);

			expect(wrapper.find(FetchError)).toHaveLength(1);
			expect(wrapper.find(SyncBtn)).toHaveLength(1);
		});
	});
});
