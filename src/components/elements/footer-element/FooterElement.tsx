// @ts-ignore
import React, { Fragment } from "react";

import { Sync, SyncBad, SyncBtn222 } from "../index";
import { statuses } from "../../../helpers/constants";

interface IProps {
  status: string;
  syncNow: () => void;
}

const FooterElement = ({ status, syncNow }: IProps): JSX.Element => {
  return (
    <Fragment>
      <span className="mr-2">© 2018 - {new Date().getFullYear()}</span>
      {status === statuses.REQUEST ? <Sync /> : null}
      {status === statuses.FAILURE ? <SyncBad /> : null}
      {status === statuses.FAILURE ? <SyncBtn222 syncNow={syncNow} /> : null}
    </Fragment>
  );
};

export { FooterElement };
