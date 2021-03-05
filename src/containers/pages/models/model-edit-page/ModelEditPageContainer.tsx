// @ts-ignore
import React, { Component } from "react";
// @ts-ignore
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { WithModels } from "../../../../hoc/with-models";
import { WithFields } from "../../../../hoc/with-fields";
import { ModelEditPage } from "../../../../components/pages";
import {
  modelsCreators,
  fetchFieldsByModelId,
} from "../../../../store/actions";
import { WithTranslation } from "../../../../hoc";
import {
  getModelsState,
  getFieldsEndpointFromLink,
} from "../../../../store/selectors";
import { Spinner } from "../../../../components/elements";

const { editModel } = modelsCreators.getFunctions();

interface IProps {
  modelsList: any;
  match: any;
}

class ModelEditPageContainer extends Component<IProps> {
  componentDidMount(): void {
    const {
      // @ts-ignore
      match: {
        params: { id },
      },
      // @ts-ignore
      fetchFieldsByModelId,
      // @ts-ignore
      modelsList,
    } = this.props;

    const endpoint = getFieldsEndpointFromLink(modelsList[id].get());

    fetchFieldsByModelId({ id, endpoint });
  }

  componentDidUpdate(prevProps): void {
    const {
      // @ts-ignore
      match: {
        params: { id },
      },
      // @ts-ignore
      fetchFieldsByModelId,
      // @ts-ignore
      modelsList,
    } = this.props;

    const endpoint = getFieldsEndpointFromLink(modelsList[id].get());

    if (prevProps.modelsList !== this.props.modelsList) {
      fetchFieldsByModelId({ id, endpoint });
    }
  }

  render() {
    const {
      match: {
        params: { id },
      },
      modelsList,
    } = this.props;

    if (!modelsList[id].get().fields) {
      return <Spinner />;
    }

    // @ts-ignore
    return <ModelEditPage {...this.props} model={modelsList[id].get()} />;
  }
}

const mapStateToProps = (state) => ({ modelsList: getModelsState(state) });

const enhance = compose(
  connect(mapStateToProps, { editModel, fetchFieldsByModelId }),
  WithTranslation,
  withRouter,
  WithModels,
  WithFields
);

export default enhance(ModelEditPageContainer);
