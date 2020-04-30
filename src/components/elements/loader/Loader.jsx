import React, {Fragment} from 'react';

const Loader = () => <Fragment>{localStorage.getItem('i18nextLng') === 'en' ? 'Loading...' : 'Загрузка...'}</Fragment>;

export {Loader};
