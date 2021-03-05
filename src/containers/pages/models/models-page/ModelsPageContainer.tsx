// @ts-ignore
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { ErrorBoundary } from '../../../../hoc';
import { ModelsPage } from '../../../../components/pages';

class ModelsPageContainer extends Component {
	render() {
		return (
      <ErrorBoundary>
        {
          // @ts-ignore
          <ModelsPage {...this.props} />
        }
      </ErrorBoundary>
    );
	}
}

// @ts-ignore
export default withTranslation()(ModelsPageContainer);
