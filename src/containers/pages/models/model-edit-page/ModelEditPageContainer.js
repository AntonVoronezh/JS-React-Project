import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { get as _get } from 'lodash';

import { WithModels } from '../../../../hoc/with-models';
import { WithFields } from '../../../../hoc/with-fields';
import { ModelEditPage } from '../../../../components/pages';
import { modelsCreators, fetchFieldsByModelId } from '../../../../store/actions';
import { WithTranslation } from '../../../../hoc';
import { getModelsState, getFieldsEndpointFromLink } from '../../../../store/selectors';
import { Spinner } from '../../../../components/elements';

const { editModel } = modelsCreators.getFunctions();

class ModelEditPageContainer extends Component {
	componentDidMount() {
		const {
			match: {
				params: { id },
			},
			fetchFieldsByModelId,
			modelsList,
		} = this.props;

		const endpoint = getFieldsEndpointFromLink(modelsList[id].get());

		fetchFieldsByModelId({ id, endpoint });
	}

	componentDidUpdate(prevProps) {
		const {
			match: {
				params: { id },
			},
			fetchFieldsByModelId,
			modelsList,
		} = this.props;

		const endpoint = getFieldsEndpointFromLink(modelsList[id].get());

		if(prevProps.modelsList !== this.props.modelsList) {
			fetchFieldsByModelId({ id, endpoint });	
		}
	}

	render() {
		const {
			match: {
				params: { id },
			},
			modelsList,
		} = this.props;

		if (!modelsList[id].get().fields) {
			return <Spinner />;
		}

		return <ModelEditPage {...this.props} model={modelsList[id].get()} />;
	}
}

const mapStateToProps = state => ({ modelsList: getModelsState(state) });

const enhance = compose(
	connect(
		mapStateToProps,
		{ editModel, fetchFieldsByModelId }
	),
	WithTranslation,
	withRouter,
	WithModels,
	WithFields
);

export default enhance(ModelEditPageContainer);
