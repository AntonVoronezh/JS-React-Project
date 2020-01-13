import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { WithModels } from '../../../../hoc/with-models';
import { WithFields } from '../../../../hoc/with-fields';
import { ModelCreatePage } from '../../../../components/pages';
import { modelsCreators } from '../../../../store/actions';

const { addModel } = modelsCreators.getFunctions();

class ModelCreatePageContainer extends Component {
	render() {
		return <ModelCreatePage {...this.props} />;
	}
}

const enhance = compose(
	connect(
		null,
		{ addModel }
	),
	withTranslation(),
	WithModels,
	WithFields
);

export default enhance(ModelCreatePageContainer);
