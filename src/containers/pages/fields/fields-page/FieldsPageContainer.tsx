// @ts-ignore
import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import { ErrorBoundary } from "../../../../hoc";
import { FieldsPage } from "../../../../components/pages";

class FieldsPageContainer extends Component {
  render() {
    return (
      <ErrorBoundary>
        {
          // @ts-ignore
          <FieldsPage {...this.props} />
        }
      </ErrorBoundary>
    );
  }
}

// @ts-ignore
export default withTranslation()(FieldsPageContainer);
