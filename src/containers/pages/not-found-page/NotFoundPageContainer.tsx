// @ts-ignore
import React, { Component } from "react";

import { ErrorBoundary } from "../../../hoc";
import { NotFoundPage } from "../../../components/pages";

class NotFoundPageContainer extends Component {
  render() {
    return (
      <ErrorBoundary>
        <NotFoundPage />
      </ErrorBoundary>
    );
  }
}

export { NotFoundPageContainer };
