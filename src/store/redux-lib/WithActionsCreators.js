import { WithActionsTypes } from './WithActionsTypes';
import { partsOfWords } from '../../helpers/constants';

export class WithActionsCreators extends WithActionsTypes {
	constructor(props) {
		super(props);
		this.typesNames = props.typesNames;
	}

	_createActionCreators = list => {
		let result = {};

		list.map(el => {
			const actionName = this.formatForTypes(el);
			const functionName = this.formatForFunctionNames(el) + partsOfWords.AC;
			result = { ...result, [functionName]: (name => (payload = null) => ({ type: name, payload }))(actionName) };

			return null;
		});

		return result;
	};

	getActionCreators = () => this._createActionCreators(this.typesNames);
}
