// @ts-ignore
import React from "react";

interface IProps {
  syncNow: () => void;
}

const SyncBtn = ({ syncNow }: IProps): JSX.Element => {
  return <button onClick={syncNow}>f</button>;
};

export { SyncBtn };
