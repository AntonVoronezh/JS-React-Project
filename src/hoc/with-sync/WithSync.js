import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEqual as _isEqual } from 'lodash';
import PropTypes from 'prop-types';

import dal from '../../helpers/libs/dal';
import {
	syncDeleteField,
	syncDeleteModel,
	syncEditModel,
	syncEditField,
	syncPostModel,
	syncPostField,
} from '../../store/actions';
import { partsOfWords } from '../../helpers/constants';
import { getSyncErrorState, getSyncStatusState, getFieldsState, getModelsState } from '../../store/selectors';

const getArrayForSync = ({ props, words }) => {
	const { MODELS, FIELDS, DELETE, EDIT, ADD } = words;
	const { syncDeleteModel, syncDeleteField, syncEditModel, syncEditField, syncPostModel, syncPostField } = props;

	return [
		{ part: MODELS, action: DELETE, funcForCall: syncDeleteModel },
		{ part: FIELDS, action: DELETE, funcForCall: syncDeleteField },
		{ part: MODELS, action: EDIT, funcForCall: syncEditModel },
		{ part: FIELDS, action: EDIT, funcForCall: syncEditField },
		{ part: MODELS, action: ADD, funcForCall: syncPostModel },
		{ part: FIELDS, action: ADD, funcForCall: syncPostField },
	];
};

const { func, array, string } = PropTypes;

function WithSync(WrappedComponent) {
	class Wrap extends Component {
		static propTypes = {
			error: string,
			status: string.isRequired,
			modelsList: array.isRequired,
			fieldsList: array.isRequired,
		};

		componentDidMount() {
			const { error } = this.props;

			dal.startSync({ arrayForSync: getArrayForSync({ props: this.props, words: partsOfWords }) });

			const funcForCall = () =>
				dal.startSync({ arrayForSync: getArrayForSync({ props: this.props, words: partsOfWords }) });

			dal.setSync({ error, funcForCall });
		}

		componentWillUnmount() {
			window.timerId && delete window.timerId;
		}

		componentDidUpdate(prevProps) {
			const { modelsList, fieldsList } = this.props;

			if (!_isEqual(modelsList, prevProps.modelsList) || !_isEqual(fieldsList, prevProps.fieldsList)) {
				dal.startSync({ arrayForSync: getArrayForSync({ props: this.props, words: partsOfWords }) });
			}
		}

		syncNow = () => dal.startSync({ arrayForSync: getArrayForSync({ props: this.props, words: partsOfWords }) });

		render() {
			return <WrappedComponent {...this.props} syncNow={this.syncNow} />;
		}
	}

	const mapStateToProps = state => ({
		error: getSyncErrorState(state),
		status: getSyncStatusState(state),
		modelsList: getModelsState(state),
		fieldsList: getFieldsState(state),
	});

	const mapDispatchToProps = dispatch =>
		bindActionCreators(
			{ syncDeleteField, syncDeleteModel, syncEditModel, syncEditField, syncPostModel, syncPostField },
			dispatch
		);

	return connect(
		mapStateToProps,
		mapDispatchToProps
	)(Wrap);
}

export { WithSync };
