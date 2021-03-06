// @ts-ignore
import React, { Fragment } from "react";

const Loader = (): JSX.Element => (
  <Fragment>
    {localStorage.getItem("i18nextLng") === "en" ? "Loading..." : "Загрузка..."}
  </Fragment>
);

export { Loader };
