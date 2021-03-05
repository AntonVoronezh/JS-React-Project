import React from 'react';
import {shallow} from 'enzyme';
import Select from 'react-select';

import {TypeSelect} from './TypeSelect';
import {InputFeedback} from '../formik-elems/formikElems';

describe('<TypeSelect />', () => {
	let wrapper;
	let props = {
		label: '',
		typesListForSelect: [],
		handleChange: () => {
		},
		defaultValue: [],
		error: null,
	};

	beforeEach(() => (wrapper = shallow(<TypeSelect {...props} />)));

	describe('initial rendering', () => {
		it('should render one label', () => {
			expect(wrapper.find('label')).toHaveLength(1);
		});

		it('should render one Select', () => {
			expect(wrapper.find(Select)).toHaveLength(1);
		});

		it('should render 0 InputFeedback', () => {
			expect(wrapper.find(InputFeedback)).toHaveLength(0);
		});

		it('should render one InputFeedback when error', () => {
			props.error = 'Error';
			wrapper = shallow(<TypeSelect {...props} />);

			expect(wrapper.find(InputFeedback)).toHaveLength(1);
		});
	});
});
