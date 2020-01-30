import React from 'react';
import {shallow, mount} from 'enzyme';

import {ChangeLanguage} from './ChangeLanguage';

const mockFn = jest.fn();

jest.mock('react-i18next', () => {
	return {
		withTranslation: x => y => y,
		Trans: ({children}) => children,
		t: key => key,
		useTranslation: () => ({i18n: {changeLanguage: mockFn}}),
	};
});

describe('<ChangeLanguage />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<ChangeLanguage/>);

		return console.log(wrapper.debug()) || wrapper;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('initial rendering', () => {
		it('should render two buttons', () => {
			expect(wrapper.find('button')).toHaveLength(2);
		});
	});

	describe('check buttons text', () => {
		it('should render first button text en', () => {
			expect(
				wrapper
					.find('button')
					.at(0)
					.text()
			).toBe('en');
		});

		it('should render first button text ru', () => {
			expect(
				wrapper
					.find('button')
					.at(1)
					.text()
			).toBe('ru');
		});
	});

	describe('check function toggleLanguage', () => {
		it('should called one times when button clicked ', () => {
			wrapper
				.find('button')
				.at(0)
				.simulate('click');

			expect(mockFn).toBeCalledTimes(1);
		});
	});
});
