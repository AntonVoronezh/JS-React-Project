import { statuses } from '../../helpers/constants';
import { modelsCreators } from '../actions';
import { bl } from '../../helpers/libs/bl';

const MODELS_ACTION_HANDLERS_WITH_FETCH = modelsCreators
	.getRSAAActionsTypes()
	.map(({ types, path }) => {
		return bl.createHandlersObjectWithFetch({ ...types }, 'modelsList', path);
	})
	.reduce((obj, el) => ({ ...obj, ...el }), {});

const MODELS_ACTION_HANDLERS_WITHOUT_FETCH = bl.createHandlersObjectWitoutFetch(
	{ ...modelsCreators.getActionsTypes() },
	'modelsList'
);

const MODELS_ACTION_HANDLERS = { ...MODELS_ACTION_HANDLERS_WITH_FETCH, ...MODELS_ACTION_HANDLERS_WITHOUT_FETCH };

const initialState = {
	modelsList: null,
	status: statuses.INIT,
	errorMsg: null,
	result: null
};

const modelsReducer = (state = initialState, action) => {
	const handler = MODELS_ACTION_HANDLERS[action.type];

	return handler ? handler(state, action) : state;
};

export { modelsReducer };
