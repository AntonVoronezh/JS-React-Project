import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';

import { WithFields } from '../../../../hoc/with-fields';
import { FieldEditPage } from '../../../../components/pages';
import { fieldsCreators } from '../../../../store/actions';

const { editField } = fieldsCreators.getFunctions();

class FieldEditPageContainer extends Component {
	render() {
		const {
			match: {
				params: { id },
			},
			fieldsList,
		} = this.props;
		
		return <FieldEditPage {...this.props} model={fieldsList[id].get()} />;
	}
}

const enhance = compose(
	connect(
		null,
		{ editField }
	),
	withTranslation(),
	WithFields,
	withRouter
);

export default enhance(FieldEditPageContainer);
