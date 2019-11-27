import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { ErrorBoundary } from '../../../hoc';
import { HeaderElement } from '../../../components/elements';

export class HeaderElementContainer extends Component {
	render() {
		return (
			<ErrorBoundary>
				<HeaderElement {...this.props} />
			</ErrorBoundary>
		);
	}
}

export default withTranslation()(HeaderElementContainer);
