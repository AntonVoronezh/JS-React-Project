// @ts-ignore
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { WithFields } from '../../../../hoc/with-fields';
import { FieldCreatePage } from '../../../../components/pages';
import { fieldsCreators } from '../../../../store/actions';

const { addField } = fieldsCreators.getFunctions();

class FieldCreatePageContainer extends Component {
	render() {
		// @ts-ignore
		return <FieldCreatePage {...this.props} />;
	}
}

const enhance = compose(
	connect(
		null,
		{ addField }
	),
	withTranslation(),
	WithFields
);

// @ts-ignore
export default enhance(FieldCreatePageContainer);
