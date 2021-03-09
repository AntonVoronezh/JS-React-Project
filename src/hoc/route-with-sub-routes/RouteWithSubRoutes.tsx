// @ts-ignore
import React from "react";
import { Route } from "react-router-dom";

function RouteWithSubRoutes(route): JSX.Element {
  return (
    <Route
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

export { RouteWithSubRoutes };
