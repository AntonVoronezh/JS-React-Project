import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const FieldsSelect = ({label, fieldsListForSelect, handleChange, defaultValue}) => {
	return (
		<Fragment>
			<label className="block">{label}</label>
			<Select defaultValue={defaultValue} onChange={handleChange} options={fieldsListForSelect} isMulti/>
		</Fragment>
	);
};

FieldsSelect.propTypes = {
	label: PropTypes.string.isRequired,
	fieldsListForSelect: PropTypes.array.isRequired,
	handleChange: PropTypes.func.isRequired,
	defaultValue: PropTypes.array.isRequired,
};

export {FieldsSelect};
