import { Component } from "react";
import { withTranslation } from "react-i18next";
import { compose } from "redux";
import { connect } from "react-redux";

import { ErrorBoundary } from "../../../hoc";
import { FieldsSelect } from "../../../components/elements";
import { getFieldsState } from "../../../store/selectors";
import { ui } from "../../../helpers/libs/ui";
import * as React from "react";

interface IProps {
  onChange: (a: string, f: boolean) => void;
  fieldsList: any;
  value: any;
}

export class FieldsSelectContainer extends Component<IProps> {
  handleChange = (values) => {
    const idFieldsArray = ui.getIdArrFromFormattedObject({ list: values });
    this.props.onChange("fields", idFieldsArray);
  };

  render() {
    const { fieldsList, value } = this.props;

    const fieldsListForSelect = ui.transformToFormatForSelectFromList({
      list: fieldsList,
    });
    const defaultValue = ui.getValuesFromListForDefault({
      list: fieldsListForSelect,
      defaultArr: value,
    });

    return (
      <ErrorBoundary>
        <FieldsSelect
          {...this.props}
          fieldsListForSelect={fieldsListForSelect}
          defaultValue={defaultValue}
          handleChange={this.handleChange}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (state) => ({ fieldsList: getFieldsState(state) });

const enhance = compose(connect(mapStateToProps), withTranslation());

// @ts-ignore
export default enhance(FieldsSelectContainer);
