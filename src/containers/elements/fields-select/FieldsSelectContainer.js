import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { ErrorBoundary } from '../../../hoc';
import { FieldsSelect } from '../../../components/elements';
import { getFieldsState } from '../../../store/selectors';
import { ui } from '../../../helpers/libs/ui';

export class FieldsSelectContainer extends Component {
	handleChange = values => {
		const idFieldsArray = ui.getIdArrFromFormattedObject({ list: values });
		this.props.onChange('fields', idFieldsArray);
	};

	render() {
		const { fieldsList, value } = this.props;

		const fieldsListForSelect = ui.transformToFormatForSelectFromList({ list: fieldsList });
		const defaultValue = ui.getValuesFromListForDefault({ list: fieldsListForSelect, defaultArr: value });

		return (
			<ErrorBoundary>
				<FieldsSelect {...this.props} fieldsListForSelect={fieldsListForSelect} defaultValue={defaultValue} handleChange={this.handleChange}/>
			</ErrorBoundary>
		);
	}
}

const mapStateToProps = state => ({ fieldsList: getFieldsState(state) });

const enhance = compose(
	connect(mapStateToProps),
	withTranslation()
);

export default enhance(FieldsSelectContainer);
