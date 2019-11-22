import {
	split as _split,
	last as _last,
	head as _head,
	omit as _omit,
	map as _map,
	filter as _filter,
	get as _get,
} from 'lodash';

import { partsOfWords } from '../constants';
import { ui } from './ui';
import { getSelfEndpointFromLink } from '../../store/selectors';
import { Model } from '../classes/Model';
import { Field } from '../classes/Field';

class BL {
	createHandlersObjectWithFetch = (typesObject, key, path) => {
		const result = {};

		for (let prop in typesObject) {
			if (typesObject.hasOwnProperty(prop)) {
				const actionType = _last(_split(typesObject[prop], '_'));

				const { REQUEST, SUCCESS, FAILURE } = partsOfWords;

				result[prop] = (state, action) => {
					const payload = action.payload ? action.payload : [null, null, false];
					const [dataFromFetch, linksFromFetch, flag] = payload;
					
					const dataForEntities = flag
						? {
								[key]: this.makeHashClassInstancesFromHashObject({
									hashObject: dataFromFetch.entities.id,
									model: key === 'modelsList' ? Model : Field,
								}),
								result: dataFromFetch.result,
						  }
						: {};

					const dataForFieldsById = path && {
						modelsList: this.addFetchedFieldsToModel({
							links: linksFromFetch,
							list: state.modelsList,
							arr: _get(dataFromFetch, 'result'),
						}),
					};

					const successData = !path ? dataForEntities : dataForFieldsById;

					const properties = flag
						? { ...state, status: actionType, result: null }
						: { ...state, status: actionType };

					return (
						{
							[REQUEST]: { ...properties, errorMsg: null },
							[SUCCESS]: { ...properties, ...successData },
							[FAILURE]: { ...properties, errorMsg: action.payload },
						}[actionType] || state
					);
				};
			}
		}

		return result;
	};

	deleteFromList = (list, id) => _omit(list, id);

	editInList = (list, model) => ({
		..._omit(list, model.id),
		[model.id]: model.className === 'model' ? new Model({ ...model }) : new Field({ ...model }),
	});

	addFetchedFieldsToModel = ({ links, list, arr }) => {
		if (arr) {
			const id = _split(getSelfEndpointFromLink({ _links: { ...links } }), '/')[1];
			list[id].set({ fields: arr });

			return { ...list };
		}

		return { ...list };
	};

	addToList = (list, model) => ({
		...list,
		[model.id]: model.className === 'model' ? new Model({ ...model }) : new Field({ ...model }),
	});

	applyStateActionPayload = ({ state, listName, payload }) => {
		return ({ func }) => {
			return {
				...state,
				[listName]: {
					...func(state[listName], payload),
				},
			};
		};
	};

	createHandlersObjectWitoutFetch = (typesObject, listName) => {
		const result = {};

		for (let prop in typesObject) {
			if (typesObject.hasOwnProperty(prop)) {
				const actionType = _head(_split(typesObject[prop], '_'));

				result[prop] = (state, action) => {
					const makeValueForAction = this.applyStateActionPayload({
						state,
						listName,
						payload: action.payload,
					});

					const { ADD, DELETE, EDIT } = partsOfWords;

					return (
						{
							[ADD]: makeValueForAction({ func: this.addToList }),
							[DELETE]: makeValueForAction({ func: this.deleteFromList }),
							[EDIT]: makeValueForAction({ func: this.editInList }),
						}[actionType] || {
							...state,
							[listName]: this.makeHashClassInstancesFromHashObject({
								hashObject: action.payload,
								model: listName === 'modelsList' ? Model : Field,
							}),
						}
					);
				};
			}
		}

		return result;
	};

	getForSync = ({ part, action }) => {
		const objectForSync = ui.getLocalItem({ name: partsOfWords.SYNC }) || {};
		const objectKey = objectForSync[part] ? objectForSync[part] : (objectForSync[part] = {});
		objectKey[action] = objectKey[action] ? objectKey[action] : [];

		return {
			objectForSync,
			objectKey,
		};
	};

	addInObjectForSync = ({ part, action, values }) => {
		const { objectForSync, objectKey } = this.getForSync({ part, action });
		const { _links, ...rest } = values;

		objectKey[action] = [...objectKey[action], { endpoint: getSelfEndpointFromLink({ _links }), payload: rest }];

		ui.setLocalItem({ name: partsOfWords.SYNC, item: objectForSync });
	};

	deleteFromObjectForSync = ({ part, action, id }) => {
		const { objectForSync, objectKey } = this.getForSync({ part, action });
		objectKey[action] = _filter(objectKey[action], el => el.payload.id !== id);

		ui.setLocalItem({ name: partsOfWords.SYNC, item: objectForSync });
	};

	mapForActionByNameForSync = ({ part, action, funcForCall }) => {
		const { objectKey } = this.getForSync({ part, action });
		_map(objectKey[action], ({ endpoint, payload }) => {
			funcForCall({ endpoint, payload });
			this.deleteFromObjectForSync({ part, action, id: payload.id });
		});
	};

	makeHashClassInstancesFromHashObject = ({ hashObject, model }) => {
		const result = {};

		for (let hash in hashObject) {
			if (hashObject.hasOwnProperty(hash)) {
				result[hash] = new model({ ...hashObject[hash] });
			}
		}
		return result;
	};
}

const bl = new BL();

export { bl };
