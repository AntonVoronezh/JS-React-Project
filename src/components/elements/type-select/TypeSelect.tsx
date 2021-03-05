// @ts-ignore
import React, { Fragment } from "react";
import Select from "react-select";

import { InputFeedback } from "../index";

interface IProps {
  label?: string;
  typesListForSelect: any;
  error?: string;
  handleChange: (f: any) => void;
  defaultValue: string;
}

const TypeSelect = ({
  label,
  typesListForSelect,
  error,
  handleChange,
  defaultValue,
}: IProps): JSX.Element => {
  return (
    <Fragment>
      <label className="block">{label}</label>
      <Select
        defaultValue={defaultValue}
        onChange={handleChange}
        options={typesListForSelect}
        required
      />
      {error && <InputFeedback error={error} />}
    </Fragment>
  );
};

export { TypeSelect };
