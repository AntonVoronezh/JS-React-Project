import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';

import { WithModels } from '../../../../hoc/with-models';
import { ModelsListPage } from '../../../../components/pages';
import { modelsCreators } from '../../../../store/actions';

const { deleteModel } = modelsCreators.getFunctions();

class ModelsListPageContainer extends Component {
	render() {
		return <ModelsListPage {...this.props} />;
	}
}

const enhance = compose(
	connect(
		null,
		{ deleteModel }
	),
	withTranslation(),
	WithModels,
);
export default enhance(ModelsListPageContainer);
