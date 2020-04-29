import React from 'react';
import {shallow} from 'enzyme';

import {FooterElement} from './FooterElement';
import {Sync} from '../sync/Sync';
import {SyncBad} from '../sync-bad/SyncBad';
import {SyncBtn222} from '../sync-btn/SyncBtn222';
import {statuses} from '../../../helpers/constants/constants';

describe('<FooterElement />', () => {
	let wrapper;
	const props = {
		status: statuses.INIT,
		syncNow: () => {
		},
	};

	beforeEach(() => (wrapper = shallow(<FooterElement {...props} />)));

	it('component should render', () => {
		expect(wrapper.find('span')).toHaveLength(1);
	});

	it('component should show <Sync /> if status === REQUEST ? ', () => {
		props.status = statuses.REQUEST;
		wrapper = shallow(<FooterElement {...props} />);

		expect(wrapper.find(Sync)).toHaveLength(1);
		expect(wrapper.find(SyncBad)).toHaveLength(0);
		expect(wrapper.find(SyncBtn222)).toHaveLength(0);
	});

	it('component should show <SyncBad /> and <SyncBtn /> if status === FAILURE ? ', () => {
		props.status = statuses.FAILURE;
		wrapper = shallow(<FooterElement {...props} />);

		expect(wrapper.find(Sync)).toHaveLength(0);
		expect(wrapper.find(SyncBad)).toHaveLength(1);
		expect(wrapper.find(SyncBtn222)).toHaveLength(1);
	});

});
