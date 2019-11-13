import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faBiohazard, faBezierCurve, faAlignJustify, faBroom } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { Trans } from 'react-i18next';

import { path } from '../constants';

const navLinks = {
	mainNav: [
		{
			to: '/',
			title: 'navigation.main',
			icon: faChartLine,
		},
		{
			to: `/${path.models}`,
			title: 'navigation.models.title',
			icon: faBiohazard,
		},
		{
			to: `/${path.fields}`,
			title: 'navigation.attrubutes.title',
			icon: faBezierCurve,
		},
	],
	modelNav: [
		{
			to: `/${path.models}/${path.list}`,
			title: 'navigation.models.list',
			icon: faAlignJustify,
		},
		{
			to: `/${path.models}/${path.create}`,
			title: 'navigation.models.create',
			icon: faBroom,
		},
	],
	fieldNav: [
		{
			to: `/${path.fields}/${path.list}`,
			title: 'navigation.attrubutes.list',
			icon: faAlignJustify,
		},
		{
			to: `/${path.fields}/${path.create}`,
			title: 'navigation.attrubutes.create',
			icon: faBroom,
		},
	],
};

const Navigation = ({ arrLinks }) => {
	return (
		<ul className="navbar-nav">
			{arrLinks.map(({ title, to, icon }) => {
				return (
					<li key={to} className="nav-item">
						<NavLink to={to} className="nav-item  nav-link  header-nav" activeClassName="active2">
							<div className="nav-wrap">
								<FontAwesomeIcon icon={icon} className="mr-1" />
								<Trans i18nKey={title} />
							</div>
						</NavLink>
					</li>
				);
			})}
		</ul>
	);
};

export { navLinks, Navigation };
