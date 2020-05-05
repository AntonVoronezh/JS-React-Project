import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Switch} from 'react-router-dom';

import './FieldsPage.css';
import {RouteWithSubRoutes} from '../../../../hoc';
import {navLinks, createNavigation} from '../../../../helpers/navigation';

const FieldsPage = ({routes}) => {
	const links = createNavigation(navLinks.fieldNav);

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

FieldsPage.propTypes = {
	routes: PropTypes.array,
};

export {FieldsPage};
