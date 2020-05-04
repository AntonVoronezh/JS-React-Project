import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import {InputFeedback} from '../../elements';

const TypeSelect = ({label, typesListForSelect, error, handleChange, defaultValue}) => {
	return (
		<Fragment>
			<label className="block">{label}</label>
			<Select defaultValue={defaultValue} onChange={handleChange} options={typesListForSelect} required/>
			{error && <InputFeedback error={error}/>}
		</Fragment>
	);
};

TypeSelect.propTypes = {
	label: PropTypes.string.isRequired,
	typesListForSelect: PropTypes.array.isRequired,
	defaultValue: PropTypes.array,
	handleChange: PropTypes.func.isRequired,
	error: PropTypes.string,
};

export {TypeSelect};
