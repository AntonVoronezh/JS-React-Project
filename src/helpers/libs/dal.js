import { RSAA } from 'redux-api-middleware';
import { map as _map } from 'lodash';

import { getFetchInstanse } from '../../helpers/services';
import { bl } from './bl';
import { syncTime } from '../constants';

class DAL {
	get = ({ object, endpoint, namespace, part, shema, payload }) => ({
		[RSAA]: {
			...getFetchInstanse({ endpoint }),
			types: [...object.getRSAAActionsAsArrayForFetch({ namespace, part, shema, payload })],
			method: 'get',
		},
	});

	func = ({ object, endpoint, namespace, payload, method }) => ({
		[RSAA]: {
			...getFetchInstanse({ endpoint }),
			types: [...object.getRSAAActionsAsArrayForPost({ namespace })],
			body: JSON.stringify(payload),
			headers: { 'Content-Type': 'application/hal+json' },
			method,
		},
	});

	startSync = ({ arrayForSync }) => {
		_map(arrayForSync, ({ part, action, funcForCall }) =>
			bl.mapForActionByNameForSync({ part, action, funcForCall })
		);
	};

	setSyncWithoutFetchErrors = ({ funcForCall }) => {
		window.timerId = window.timerId ? window.timerId : {};
		const random = this.getRandInt(syncTime.startRandomNumberForWindowId, syncTime.finishRandomNumberForWindowId);

		window.timerId[random] = window.setInterval(() => funcForCall(), syncTime.timeInMiliseconds);
	};

	setSyncWithFetchErrors = ({ funcForCall }) => {
		const timer = [
			syncTime.firstTimeForSyncWithFetchErrors,
			syncTime.secondTimeForSyncWithFetchErrors,
			syncTime.thirdTimeForSyncWithFetchErrors,
			syncTime.fourthTimeForSyncWithFetchErrors,
			syncTime.fiveTimeForSyncWithFetchErrors,
		];

		window.timerId = window.timerId ? window.timerId : {};

		_map(timer, el => {
			const random = this.getRandInt(
				syncTime.startRandomNumberForWindowId,
				syncTime.finishRandomNumberForWindowId
			);
			window.timerId[random] = window.setTimeout(() => funcForCall(), el);
		});
	};

	setSync = ({ error, funcForCall }) =>
		error ? this.setSyncWithFetchErrors({ funcForCall }) : this.setSyncWithoutFetchErrors({ funcForCall });

	getRandInt = (min, max) => Math.round(Math.random() * (max - min) + min);
}

const dal = new DAL();

export { dal };

export default dal;
