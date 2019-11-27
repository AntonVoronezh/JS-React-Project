import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import { FieldsSelectContainer } from './FieldsSelectContainer';
import { FieldsSelect } from '../../../components/elements/fields-select/FieldsSelect';

const mockStore = configureMockStore();
const store = mockStore({});

const props = {
	label: '',
	onChange: () => {},
	value: [],
};

describe('<FieldsSelectContainer />', () => {
	let wrapper;

	beforeEach(() => (wrapper = shallow(<FieldsSelectContainer {...props} />, { context: { store } }).dive()));

	it('component should render', () => {
		expect(wrapper.find(FieldsSelect)).toHaveLength(1);
	});

	it('handleChange should called one times', () => {
		wrapper.handleChange = jest.fn();
		wrapper.handleChange();

		expect(wrapper.handleChange).toHaveBeenCalledTimes(1);
	});

	it('handleChange should called with values', () => {
		wrapper.handleChange = jest.fn();
		wrapper.handleChange('values');

		expect(wrapper.handleChange).toBeCalledWith('values');
	});

	it('onChange should called one times after called handleChange', () => {
		props.onChange = jest.fn();
		wrapper.handleChange = jest.fn(props.onChange());
		wrapper.handleChange();

		expect(props.onChange).toHaveBeenCalledTimes(1);
	});

	it('onChange should called one times with values after called handleChange', () => {
		props.onChange = jest.fn();
		wrapper.handleChange = jest.fn(value => props.onChange(value));
		wrapper.handleChange('values');

		expect(props.onChange).toBeCalledWith('values');
	});
});
