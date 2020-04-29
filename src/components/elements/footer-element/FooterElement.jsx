import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {Sync, SyncBad, SyncBtn222} from '../../elements';
import {statuses} from '../../../helpers/constants';

const FooterElement = ({status, syncNow}) => {
	return (
		<Fragment>
			<span className="mr-2">© 2018 - {new Date().getFullYear()}</span>
			{status === statuses.REQUEST ? <Sync/> : null}
			{status === statuses.FAILURE ? <SyncBad/> : null}
			{status === statuses.FAILURE ? <SyncBtn222 syncNow={syncNow}/> : null}
		</Fragment>
	);
};

FooterElement.propTypes = {
	status: PropTypes.string.isRequired,
	syncNow: PropTypes.func.isRequired,
};

export {FooterElement};
