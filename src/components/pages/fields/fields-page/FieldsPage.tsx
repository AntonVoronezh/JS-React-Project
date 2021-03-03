// @ts-ignore
import React, { Fragment } from "react";
import { Switch } from "react-router-dom";

import "./FieldsPage.css";
import { RouteWithSubRoutes } from "../../../../hoc";
import { navLinks, Navigation } from "../../../../helpers/navigation";

interface IProps {
	routes: any;
}

const FieldsPage = ({ routes }: IProps): JSX.Element => {
  const links = Navigation(navLinks.fieldNav);

  return (
    <Fragment>
      <nav className="navbar  navbar-expand-sm  navbar-light">
        <div className="navbar-collapse">{links}</div>
      </nav>

      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </Fragment>
  );
};

export { FieldsPage };
