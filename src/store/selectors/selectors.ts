import { createSelector } from "reselect";
import { split as _split } from "lodash";

const getModels = (state) => (state && state.models.modelsList) || null;

const getModelsState = createSelector([getModels], (models) => models);

const getFields = (state) => (state && state.fields.fieldsList) || null;

const getFieldsState = createSelector([getFields], (fields) => fields);

const getFieldsError = (state) => (state && state.fields.errorMsg) || null;

const getFieldsErrorState = createSelector([getFieldsError], (error) => error);

const getModelsError = (state) => (state && state.models.errorMsg) || null;

const getModelsErrorState = createSelector([getModelsError], (error) => error);

const getFuncForParseLinks = ({ item }) => {
  return (state) => _split(state["_links"][item]["href"], "/api/")[1];
};

const getFieldsEndpointFromLink = getFuncForParseLinks({ item: "fields" });

const getSelfEndpointFromLink = getFuncForParseLinks({ item: "self" });

const getSyncError = (state) => (state && state.sync.errorMsg) || null;

const getSyncErrorState = createSelector([getSyncError], (error) => error);

const getSyncStatus = (state) => state && state.sync.status;

const getSyncStatusState = createSelector([getSyncStatus], (error) => error);

export {
  getModelsState,
  getFieldsState,
  getFieldsErrorState,
  getModelsErrorState,
  getFieldsEndpointFromLink,
  getSyncErrorState,
  getSyncStatusState,
  getSelfEndpointFromLink,
};
