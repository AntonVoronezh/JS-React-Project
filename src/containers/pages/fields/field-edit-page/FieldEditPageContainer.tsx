// @ts-ignore
import React, { Component } from "react";
// @ts-ignore
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { compose } from "redux";

import { WithFields } from "../../../../hoc/with-fields";
import { FieldEditPage } from "../../../../components/pages";
import { fieldsCreators } from "../../../../store/actions";

const { editField } = fieldsCreators.getFunctions();

class FieldEditPageContainer extends Component {
  render() {
    const {
      // @ts-ignore
      match: {
        params: { id },
      },
      // @ts-ignore
      fieldsList,
    } = this.props;

    // @ts-ignore
    return <FieldEditPage {...this.props} model={fieldsList[id].get()} />;
  }
}

const enhance = compose(
  connect(null, { editField }),
  withTranslation(),
  WithFields,
  withRouter
);

// @ts-ignore
export default enhance(FieldEditPageContainer);
