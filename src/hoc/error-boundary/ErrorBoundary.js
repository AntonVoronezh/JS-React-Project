import React, { Component, Fragment } from 'react';
import * as Sentry from '@sentry/browser';

import { ErrorIndicator } from '../../components/elements';

class ErrorBoundary extends Component {
	state = {
		hasError: false,
		eventId: null,
	};

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		Sentry.withScope(scope => {
			scope.setExtras(errorInfo);
			const eventId = Sentry.captureException(error);
			this.setState({ eventId });
		});
	}

	render() {
		if (this.state.hasError) {
			return (
				<Fragment>
					<ErrorIndicator />
					<button onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}>
						Report feedback
					</button>
				</Fragment>
			);
		}

		return this.props.children;
	}
}

export { ErrorBoundary };
