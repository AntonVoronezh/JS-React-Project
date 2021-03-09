import { dal } from "../../helpers/libs/dal";
import { ForRedux } from "../redux-lib";

const syncCreators = new ForRedux({
  RSAANames: [
    { type: "sync delete model" },
    { type: "sync delete field" },
    { type: "sync put model" },
    { type: "sync put field" },
    { type: "sync post model" },
    { type: "sync post field" },
  ],
  functionsNames: [],
  typesNames: [],
});

const createSyncFunctions = ({ key, part }) => {
  return ({ endpoint, payload }) =>
    dal.func({
      object: syncCreators,
      namespace: `sync ${key} ${part}`,
      endpoint,
      payload,
      method: key,
    });
};

const syncDeleteModel = createSyncFunctions({ key: "delete", part: "model" });
const syncDeleteField = createSyncFunctions({ key: "delete", part: "field" });
const syncEditModel = createSyncFunctions({ key: "put", part: "model" });
const syncEditField = createSyncFunctions({ key: "put", part: "field" });
const syncPostModel = createSyncFunctions({ key: "post", part: "model" });
const syncPostField = createSyncFunctions({ key: "post", part: "field" });

export {
  syncCreators,
  syncDeleteModel,
  syncDeleteField,
  syncEditModel,
  syncEditField,
  syncPostModel,
  syncPostField,
};
