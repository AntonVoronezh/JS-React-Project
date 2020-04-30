import React, {Fragment} from 'react';

const InputFeedback = ({error}) => (error ? <div className="field-error">{error}</div> : null);

const Checkbox = ({
					  field: {name, value, onChange, onBlur},
					  form: {errors, touched},
					  id,
					  label,
					  className,
					  ...props
				  }) => {
	return (
		<Fragment>
			<label htmlFor={id} className="block">
				{label}
			</label>
			<input
				name={name}
				id={id}
				type="checkbox"
				value={value}
				checked={value}
				onChange={onChange}
				onBlur={onBlur}
				className="form-checkbox  block"
				{...props}
			/>
			{touched[name] && <InputFeedback error={errors[name]}/>}
		</Fragment>
	);
};

const InputText = ({
					   field: {name, value, onChange, onBlur},
					   form: {errors, touched},
					   id,
					   label,
					   className,
					   ...props
				   }) => {
	return (
		<Fragment>
			<label htmlFor={id} className="block">
				{label}
			</label>
			<input
				name={name}
				id={id}
				type="text"
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				className="form-control  form-control-sm"
				{...props}
			/>
			{errors[name] && touched[name] && <InputFeedback error={errors[name]}/>}
		</Fragment>
	);
};

export {InputFeedback, Checkbox, InputText};
