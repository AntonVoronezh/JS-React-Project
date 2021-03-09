// @ts-ignore
import React, { Component } from "react";
import { withTranslation } from "react-i18next";

function WithTranslation(WrappedComponent) {
  class Wrap extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  // @ts-ignore
  return withTranslation()(Wrap);
}

export { WithTranslation };
