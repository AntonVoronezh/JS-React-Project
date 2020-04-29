import React from 'react';
import {shallow} from 'enzyme';
import Select from 'react-select';

import {FieldsSelect} from './FieldsSelect';

describe('<FieldsSelect />', () => {
	let wrapper;
	let props = {
		label: '',
		fieldsListForSelect: [],
		handleChange: () => {
		},
		defaultValue: [],
	};

	beforeEach(() => (wrapper = shallow(<FieldsSelect {...props} />)));

	describe('<FieldsSelect /> initial rendering', () => {
		it('should render one label', () => {
			expect(wrapper.find('label')).toHaveLength(1);
		});

		it('should render one Select', () => {
			expect(wrapper.find(Select)).toHaveLength(1);
		});
	});
});
