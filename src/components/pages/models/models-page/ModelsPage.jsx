import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Switch} from 'react-router-dom';

import './ModelsPage.css';
import {RouteWithSubRoutes} from '../../../../hoc';
import {navLinks, createNavigation} from '../../../../helpers/navigation';

const ModelsPage = ({routes}) => {
	const links = createNavigation(navLinks.modelNav);

	return (
		<Fragment>
			<nav className="navbar  navbar-expand-sm  navbar-light">
				<div className="navbar-collapse">{links}</div>
			</nav>

			<Switch>
				{routes.map((route, i) => (
					<RouteWithSubRoutes key={i} {...route} />
				))}
			</Switch>
		</Fragment>
	);
};

ModelsPage.propTypes = {
	routes: PropTypes.array,
};

export {ModelsPage};
