// @ts-ignore
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { compose } from "redux";
import { connect } from "react-redux";

import { ErrorBoundary } from "../../../hoc";
import { TypeSelect } from "../../../components/elements";
import { types } from "../../../helpers/constants";
import { getFieldsState } from "../../../store/selectors";
import { ui } from "../../../helpers/libs/ui";

interface IProps {
  onChange: (a: string, f: any) => void;
  value: any;
}

export class TypeSelectContainer extends Component<IProps> {
  handleChange = ({ value }) => {
    this.props.onChange("type", value);
  };

  render() {
    const typesListForSelect = ui.transformToFormatForSelectFromTypes({
      types,
    });
    const defaultValue = ui.getHashFromObjectBySelector({
      object: typesListForSelect,
      selector: "value",
    })[this.props.value];

    return (
      <ErrorBoundary>
        <TypeSelect
          {...this.props}
          defaultValue={defaultValue}
          handleChange={this.handleChange}
          typesListForSelect={typesListForSelect}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (state) => ({ fieldsList: getFieldsState(state) });

const enhance = compose(connect(mapStateToProps), withTranslation());

// @ts-ignore
export default enhance(TypeSelectContainer);
