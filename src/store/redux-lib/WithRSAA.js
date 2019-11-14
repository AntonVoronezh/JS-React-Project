import { normalize } from 'normalizr';
import { split as _split, join as _join, upperCase as _upperCase } from 'lodash';

import { partsOfWords } from '../../helpers/constants';
import { WithFunctions } from './WithFunctions';

export class WithRSAA extends WithFunctions {
	constructor(props) {
		super(props);
		this.RSAANames = props.RSAANames;
	}

	_createRSAAActions = ({ namespace, flag }) => {
		const NAMESPACE = _join(_split(_upperCase(namespace), ' '), '_');

		const request = `${partsOfWords.FETCH}_${NAMESPACE}_${partsOfWords.REQUEST}`;
		const success = `${partsOfWords.FETCH}_${NAMESPACE}_${partsOfWords.SUCCESS}`;
		const failure = `${partsOfWords.FETCH}_${NAMESPACE}_${partsOfWords.FAILURE}`;

		if (flag) {
			return {
				request: request,
				success: success,
				failure: failure,
			};
		} else {
			return {
				[request]: request,
				[success]: success,
				[failure]: failure,
			};
		}
	};

	_createRSSAActionsTypes = list => {
		let result = [];

		list.map(({ type, ...rest }) => {
			const types = this._createRSAAActions({ namespace: type, flag: false });
			result = [...result, { types, ...rest }];

			return null;
		});

		return result;
	};

	getRSAAActionsAsArray = ({ namespace }) => {
		const { request, success, failure } = this._createRSAAActions({ namespace, flag: true });
		return [request, success, failure];
	};

	getRSAAActionsAsArrayForFetch = ({ namespace, part, shema }) => {
		const { request, success, failure } = this._createRSAAActions({ namespace, flag: true });

		return [
			request,
			{
				type: success,
				payload: (action, state, res) =>
					res.json().then(data => [normalize(data._embedded[part], shema), data._links, true]),
			},
			failure,
		];
	};

	getRSAAActionsAsArrayForPost = ({ namespace }) => {
		const { request, success, failure } = this._createRSAAActions({ namespace, flag: true });

		return [
			request,
			{
				type: success,
				payload: (action, state, res) => (res.ok ? [null, null, false] : null),
			},
			failure,
		];
	};

	getRSAAActionsTypes = () => this._createRSSAActionsTypes(this.RSAANames);
}
