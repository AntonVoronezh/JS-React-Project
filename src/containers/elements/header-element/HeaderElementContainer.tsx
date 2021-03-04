// @ts-ignore
import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import { ErrorBoundary } from "../../../hoc";
import { HeaderElement } from "../../../components/elements";

export class HeaderElementContainer extends Component {
  render() {
    return (
      <ErrorBoundary>
        {
          // @ts-ignore
          <HeaderElement {...this.props} />
        }
      </ErrorBoundary>
    );
  }
}

// @ts-ignore
export default withTranslation()(HeaderElementContainer);
