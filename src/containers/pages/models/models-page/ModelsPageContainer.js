import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { ErrorBoundary } from '../../../../hoc';
import { ModelsPage } from '../../../../components/pages';

class ModelsPageContainer extends Component {
	render() {
		return (
			<ErrorBoundary>
				<ModelsPage {...this.props} />
			</ErrorBoundary>
		);
	}
}

export default withTranslation()(ModelsPageContainer);
