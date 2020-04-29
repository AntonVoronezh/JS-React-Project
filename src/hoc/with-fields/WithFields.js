import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {fetchFields, fieldsCreators} from '../../store/actions';
import {Spinner, FetchError, SyncBtn222} from '../../components/elements';
import {getFieldsState, getFieldsErrorState} from '../../store/selectors';
import { ErrorBoundary } from '../../hoc';
import ui from '../../helpers/libs/ui';
import dal from '../../helpers/libs/dal';

const { setFieldsFromLocalStorage } = fieldsCreators.getFunctions();

function WithFields(WrappedComponent) {
	class Wrap extends Component {
		componentDidMount() {
			const { fieldsList, fetchFields, setFieldsFromLocalStorage, errorMsg } = this.props;

			!fieldsList && ui.getData({ item: 'fields', setFunc: setFieldsFromLocalStorage, fetchFunc: fetchFields });

			dal.setSync({ error: errorMsg, funcForCall: fetchFields });
		}

		componentDidUpdate(prevProps) {
			const { fieldsList } = this.props;

			ui.updateLocal({ list: fieldsList, prevList: prevProps.fieldsList, item: 'fields' });
		}

		render() {
			const { fieldsList, errorMsg, fetchFields } = this.props;

			if (errorMsg) {
				return (
					<Fragment>
						<FetchError err={errorMsg}/>
						<SyncBtn222 syncNow={fetchFields}/>
					</Fragment>
				);
			}

			if (!fieldsList) {
				return <Spinner />;
			}

			return (
				<ErrorBoundary>
					<WrappedComponent {...this.props} />
				</ErrorBoundary>
			);
		}
	}

	const mapStateToProps = state => ({
		fieldsList: getFieldsState(state),
		errorMsg: getFieldsErrorState(state),
	});

	const mapDispatchToProps = dispatch => bindActionCreators({ fetchFields, setFieldsFromLocalStorage }, dispatch);

	return connect(
		mapStateToProps,
		mapDispatchToProps
	)(Wrap);
}

export { WithFields };
