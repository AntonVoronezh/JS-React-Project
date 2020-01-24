import React, {Component, Suspense} from 'react';
import {Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import {HeaderElement, FooterElement} from '../../containers/elements';
import {ErrorIndicator, Loader} from '../elements';
import {routes} from '../../helpers/navigation';
import {RouteWithSubRoutes} from '../../hoc';

class App extends Component {
	state = {
		hasError: false,
	};

	componentDidCatch() {
		this.setState({hasError: true});
	}

	render() {
		if (this.state.hasError) {
			return <ErrorIndicator/>;
		}
		return (
			<Suspense fallback={<Loader/>}>
				<div className="container mt-20 border">
					<div className="row">
						<div className="col-md-12 app">
							<header className="app-top">
								<HeaderElement/>
								<ToastContainer/>

							</header>
							<main className="app-center">
								<Switch>
									{routes.map((route, i) => (
										<RouteWithSubRoutes key={i} {...route} />
									))}
								</Switch>
							</main>
							<footer className="app-bottom">
								<FooterElement/>
							</footer>
						</div>
					</div>
				</div>
			</Suspense>

		);
	}
}

export {App};
