// @ts-ignore
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchModels, modelsCreators } from "../../store/actions";
import { Spinner, FetchError, SyncBtn222 } from "../../components/elements";
import { getModelsErrorState, getModelsState } from "../../store/selectors";
import { ErrorBoundary } from "../index";
import ui from "../../helpers/libs/ui";
import dal from "../../helpers/libs/dal";

const { setModelsFromLocalStorage } = modelsCreators.getFunctions();

interface IProps {
  modelsList: any;
  fetchModels: () => void;
  setModelsFromLocalStorage: () => void;
  errorMsg: any;
}

function WithModels(WrappedComponent) {
  class Wrap extends Component<IProps> {
    componentDidMount() {
      const {
        modelsList,
        fetchModels,
        setModelsFromLocalStorage,
        errorMsg,
      } = this.props;

      !modelsList &&
        ui.getData({
          item: "models",
          setFunc: setModelsFromLocalStorage,
          fetchFunc: fetchModels,
        });

      dal.setSync({ error: errorMsg, funcForCall: fetchModels });
    }

    componentDidUpdate(prevProps) {
      const { modelsList } = this.props;

      ui.updateLocal({
        list: modelsList,
        prevList: prevProps.modelsList,
        item: "models",
      });
    }

    render() {
      const { modelsList, errorMsg, fetchModels } = this.props;

      if (errorMsg) {
        return (
          <Fragment>
            <FetchError err={errorMsg} />
            <SyncBtn222 syncNow={fetchModels} />
          </Fragment>
        );
      }

      if (!modelsList) {
        return <Spinner />;
      }

      return (
        <ErrorBoundary cgildren={""}>
          <WrappedComponent {...this.props} />
        </ErrorBoundary>
      );
    }
  }

  const mapStateToProps = (state) => ({
    modelsList: getModelsState(state),
    errorMsg: getModelsErrorState(state),
  });

  const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ fetchModels, setModelsFromLocalStorage }, dispatch);

  return connect(mapStateToProps, mapDispatchToProps)(Wrap);
}

export { WithModels };
