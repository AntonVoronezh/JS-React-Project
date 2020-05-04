import React from 'react';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';

const SyncBtn222 = ({syncNow}) => {
	const {t} = useTranslation();

	return (
		<button className="btn btn-warning" onClick={syncNow}>
			{t('sync.now')}
		</button>
	);
};

SyncBtn222.propTypes = {
	syncNow: PropTypes.func.isRequired,
};

export {SyncBtn222};
