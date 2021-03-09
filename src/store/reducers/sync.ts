import { statuses } from "../../helpers/constants";
import { syncCreators } from "../actions";
import { bl } from "../../helpers/libs/bl";

const SYNC_ACTION_HANDLERS_WITH_FETCH = syncCreators
  .getRSAAActionsTypes()
  .map(({ types, path }) => {
    return bl.createHandlersObjectWithFetch({ ...types }, "sync", path);
  })
  .reduce((obj, el) => ({ ...obj, ...el }), {});

const SYNC_ACTION_HANDLERS = { ...SYNC_ACTION_HANDLERS_WITH_FETCH };

const initialState = {
  sync: null,
  status: statuses.INIT,
  errorMsg: null,
};

const syncReducer = (state = initialState, action) => {
  const handler = SYNC_ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export { syncReducer };
