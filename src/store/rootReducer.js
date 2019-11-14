import { combineReducers } from 'redux';

import { modelsReducer, fieldsReducer, syncReducer } from './reducers';

const rootReducer = combineReducers({
	models: modelsReducer,
	fields: fieldsReducer,
	sync: syncReducer,
});

export default rootReducer;
