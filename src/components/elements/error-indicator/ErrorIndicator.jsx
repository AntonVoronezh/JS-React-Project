import React from 'react';
import {useTranslation} from 'react-i18next';

import './ErrorIndicator.css';
import icon from './err.png';

const ErrorIndicator = () => {
    const {t} = useTranslation();

    return (
        <div className="error-indicator">
            <img src={icon} alt="error icon"/>
            <span className="display-4 text-danger">{t('errors.title')}</span>
            <span>{t('errors.textTop')}</span>
            <span>{t('errors.textBottom')}</span>
        </div>
    );
};

export {ErrorIndicator};
