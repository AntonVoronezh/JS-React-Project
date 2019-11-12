import React from 'react';
import { mount } from 'enzyme';
import * as Sentry from '@sentry/browser';

import { ErrorBoundary } from './ErrorBoundary';
import { ErrorIndicator } from '../../components/elements/error-indicator/ErrorIndicator';

jest.mock('../../components/elements/error-indicator/ErrorIndicator');

jest.mock('@sentry/browser', () => {
	const original = jest.requireActual('@sentry/browser');
	return {
		...original,
		withScope: jest.fn().mockImplementation(() => null),
		showReportDialog: jest.fn().mockImplementation(() => null),
	};
});

const ProblemChild = () => {
	throw new Error('Error thrown from problem child');
};

describe('HOC <ErrorBoundary />', () => {
	let spy,
		wrapper,
		MockComponent = () => <div></div>;

	beforeAll(() => {
		wrapper = mount(
			<ErrorBoundary>
				<MockComponent />
			</ErrorBoundary>
		);
	});

	describe('Rendering UI', () => {
		it('component should render one MockComponent', () => {
			expect(wrapper.find(MockComponent)).toHaveLength(1);
		});
		it('component should render one ErrorIndicator and one button when hasError === true', () => {
			wrapper.setState({ hasError: true });
			expect(wrapper.find(ErrorIndicator)).toHaveLength(1);
			expect(wrapper.find('button')).toHaveLength(1);
		});
	});

	describe('Check functionality', () => {
		it('component should call showReportDialog one time', () => {
			wrapper.setState({ hasError: true });
			spy = jest.spyOn(Sentry, 'showReportDialog');
			wrapper.find('button').simulate('click');

			expect(spy).toBeCalledTimes(1);
		});

		it('component should call withScope one time when catch error', () => {
			wrapper = mount(
				<ErrorBoundary>
					<ProblemChild />
				</ErrorBoundary>
			);
			spy = jest.spyOn(Sentry, 'withScope');

			expect(spy).toBeCalledTimes(1);
		});
	});
});
