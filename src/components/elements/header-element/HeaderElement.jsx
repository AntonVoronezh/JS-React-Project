import React from 'react';

import './HeaderElement.css';
import {navLinks, Navigation} from '../../../helpers/navigation';
import {ChangeLanguage} from '../../elements';

const HeaderElement = () => {
	return (
		<nav className="navbar navbar-expand-sm navbar-light bg-light">
			<div className="collapse navbar-collapse">
				<Navigation arrLinks={navLinks.mainNav}/>
			</div>
			<ChangeLanguage/>
		</nav>
	);
};

export {HeaderElement};
