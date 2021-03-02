// @ts-ignore
import React, { Fragment } from "react";
import Select from "react-select";

interface IProps {
  label: string;
  fieldsListForSelect: string;
  handleChange: () => void;
  defaultValue: string;
}

const FieldsSelect = ({
  label,
  fieldsListForSelect,
  handleChange,
  defaultValue,
}: IProps): JSX.Element => {
  return (
    <Fragment>
      <label className="block">{label}</label>
      <Select
        defaultValue={defaultValue}
        onChange={handleChange}
        options={fieldsListForSelect}
        isMulti
      />
    </Fragment>
  );
};

export { FieldsSelect };
