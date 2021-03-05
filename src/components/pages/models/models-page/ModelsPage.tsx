// @ts-ignore
import React, { Fragment } from "react";
import { Switch } from "react-router-dom";

import "./ModelsPage.css";
import { RouteWithSubRoutes } from "../../../../hoc";
import { navLinks, Navigation } from "../../../../helpers/navigation";

const ModelsPage = ({ routes }):JSX.Element => {
  const links = Navigation(navLinks.modelNav);

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

export { ModelsPage };
