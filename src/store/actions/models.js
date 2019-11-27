import { dal } from '../../helpers/libs/dal';
import { mySchema } from '../../helpers/shemas';
import { ForRedux } from '../redux-lib';

const modelsCreators = new ForRedux({
	RSAANames: [
		{ type: 'models' },
		{ type: 'fields for model by id', path:'*' },
		{ type: 'create new model' },
	],
	functionsNames: ['delete model', 'edit model', 'add model'],
	typesNames: ['set models from local storage'],
});

const fetchModels = () =>
	dal.get({
		object: modelsCreators,
		endpoint: 'entities',
		namespace: 'models',
		part: 'entities',
		shema: mySchema,
	});

const fetchFieldsByModelId = ({ endpoint }) => 
	dal.get({
		object: modelsCreators,
		endpoint,
		namespace: 'fields for model by id',
		part: 'fields',
		shema: mySchema,
	});

export { fetchModels, modelsCreators, fetchFieldsByModelId };
