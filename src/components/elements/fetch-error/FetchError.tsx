// @ts-ignore
import React from "react";

interface IProps {
  err: {
    name: string;
    message: string;
  };
}

const FetchError = ({ err: { name, message } }: IProps): JSX.Element => (
  <div className="field-error">{`${name} - ${message}`}</div>
);

export { FetchError };
