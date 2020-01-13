import React, { Component } from 'react';

import { ErrorBoundary } from '../../../hoc';
import { MainPage } from '../../../components/pages';

class MainPageContainer extends Component {
	render() {
		return (
			<ErrorBoundary>
				<MainPage />
			</ErrorBoundary>
		);
	}
}

export { MainPageContainer };
