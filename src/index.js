import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';

import './helpers/configs/i18n';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { App } from './components/app';
import createStore from './store/store';

// Sentry.init({dsn: "https://9bb4bcf474b04d80b8c47575b4b390a0@sentry.educate.center/2"});
const store = createStore();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,

	document.getElementById('root')
);
serviceWorker.unregister();
