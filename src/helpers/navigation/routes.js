import {
	MainPage,
	NotFoundPage,
	ModelsPage,
	ModelsListPage,
	ModelEditPage,
	ModelCreatePage,
	FieldsPage,
	FieldCreatePage,
	FieldsListPage,
	FieldEditPage
} from '../../containers/pages';
import { path } from '../constants';

const routes = [
	{
		path: '/',
		exact: true,
		component: MainPage,
	},
	{
		path: `/${path.models}`,
		component: ModelsPage,
		routes: [
			{
				path: `/${path.models}/${path.list}`,
				component: ModelsListPage,
			},
			{
				path: `/${path.models}/${path.edit}/:${path.id}`,
				component: ModelEditPage,
			},
			{
				path: `/${path.models}/${path.create}`,
				component: ModelCreatePage,
			},
		],
	},
	{
		path: `/${path.fields}`,
		component: FieldsPage,
		routes: [
			{
				path: `/${path.fields}/${path.list}`,
				component: FieldsListPage,
			},
			{
				path: `/${path.fields}/${path.edit}/:${path.id}`,
				component: FieldEditPage,
			},
			{
				path: `/${path.fields}/${path.create}`,
				component: FieldCreatePage,
			},
		],
	},
	{
		path: '',
		component: NotFoundPage,
	},
];

export { routes };
