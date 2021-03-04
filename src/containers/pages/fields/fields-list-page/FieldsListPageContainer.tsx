// @ts-ignore
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';

import { WithFields } from '../../../../hoc/with-fields';
import { FieldsListPage } from '../../../../components/pages';
import { fieldsCreators } from '../../../../store/actions';

const { deleteField } = fieldsCreators.getFunctions();

class FieldsListPageContainer extends Component {
	render() {
		// @ts-ignore
		return <FieldsListPage {...this.props} />;
	}
}

const enhance = compose(
	connect(
		null,
		{ deleteField }
	),
	withTranslation(),
	WithFields
);

// @ts-ignore
export default enhance(FieldsListPageContainer);
