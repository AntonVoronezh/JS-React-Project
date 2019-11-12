import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { WithModels } from './WithModels';
import { Spinner } from '../../components/elements/spinner/Spinner';
import { SyncBtn } from '../../components/elements/sync-btn/SyncBtn';
import { FetchError } from '../../components/elements/fetch-error/FetchError';


jest.mock('../../components/elements/sync-btn/SyncBtn');

describe('HOC <WithModels />', () => {
	let spy,Elem,
		wrapper,
		MockComponent = () => <div></div>;

	beforeAll(() => {
		Elem = WithModels().withoutConnect;
		spy = jest.spyOn(Elem.prototype, 'componentDidMount');
		wrapper = shallow(<Elem component={MockComponent}/>);
	});

	describe('Check lifecycle methods', () => {
		it('component should call componentDidMount one time', () => {
			expect(spy).toHaveBeenCalled();
		});
	});

	
});
