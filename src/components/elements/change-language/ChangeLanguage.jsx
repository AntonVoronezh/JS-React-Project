import React, {Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import {map as _map} from 'lodash';

import {languages} from '../../../helpers/constants';

const ChangeLanguage = () => {
	const {i18n} = useTranslation();

	const languagesList = _map(languages, el => {
		return (
			<button key={el} className="btn btn-light mr-1" onClick={() => i18n.changeLanguage(el)}>
				{el}
			</button>
		);
	});

	return <Fragment>{languagesList}</Fragment>;
};

export {ChangeLanguage};
