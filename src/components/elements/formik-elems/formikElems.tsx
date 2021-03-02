// @ts-ignore
import React, { Fragment } from "react";

interface IInputFeedbackProps {
  error: string;
}

interface ICheckboxProps {
  field: any;
  form: any;
  id: any;
  label: any;
  className: any;
}

interface InputTextProps {
  field: any;
  form: any;
  id: any;
  label: any;
  className: any;
}

const InputFeedback = ({ error }: IInputFeedbackProps): JSX.Element =>
  error ? <div className="field-error">{error}</div> : null;

const Checkbox = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched },
  id,
  label,
  className,
  ...props
}: ICheckboxProps): JSX.Element => {
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
      {touched[name] && <InputFeedback error={errors[name]} />}
    </Fragment>
  );
};

const InputText = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched },
  id,
  label,
  className,
  ...props
}: InputTextProps): JSX.Element => {
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
      {errors[name] && touched[name] && <InputFeedback error={errors[name]} />}
    </Fragment>
  );
};

export { InputFeedback, Checkbox, InputText };
