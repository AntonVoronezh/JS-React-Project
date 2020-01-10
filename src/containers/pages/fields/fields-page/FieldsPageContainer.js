import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { ErrorBoundary } from '../../../../hoc';
import { FieldsPage } from '../../../../components/pages';

class FieldsPageContainer extends Component {
	render() {
		return (
			<ErrorBoundary>
				<FieldsPage {...this.props} />
			</ErrorBoundary>
		);
	}
}

export default withTranslation()(FieldsPageContainer);
