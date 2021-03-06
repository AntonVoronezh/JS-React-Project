import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { WithModels } from './WithModels';
import {Spinner} from '../../components/elements/spinner/Spinner';
import {SyncBtn222} from '../../components/elements/sync-btn/SyncBtn222';
import {FetchError} from '../../components/elements/fetch-error/FetchError';
import ui from '../../helpers/libs/ui';
import dal from '../../helpers/libs/dal';

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

const HOCWrap = (Component, initialProps = {}, state = null) => {
	const wrapper = mount(
		React.createElement(
			props => (
				<Provider store={initialProps}>
					<Component {...props} />
				</Provider>
			),
			initialProps
		)
	);

	if (state) wrapper.find(Component).setState(state);
	return wrapper;
};

describe('HOC <WithModels />', () => {
	let spy,
		wrapper,
		initialProps,
		initialState,
		MockComponent = () => <div></div>;

	initialProps = {
		message: 'Loading your preferences...',
	};

	initialState = {
		models: {
			modelsList: null,
			errorMsg: null,
		},
	};

	beforeAll(() => {
		wrapper = HOCWrap(WithModels, initialProps, initialState);
	});

	describe('Rendering UI', () => {
		it('component should render one MockComponent', () => {
			expect(wrapper.find(MockComponent)).toHaveLength(1);
		});

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
	});
});
