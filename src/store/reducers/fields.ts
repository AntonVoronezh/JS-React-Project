import { statuses } from "../../helpers/constants";
import { fieldsCreators } from "../actions";
import { bl } from "../../helpers/libs/bl";

const FIELDS_ACTION_HANDLERS_WITH_FETCH = fieldsCreators
  .getRSAAActionsTypes()
  .map(({ types, path }) => {
    return bl.createHandlersObjectWithFetch({ ...types }, "fieldsList", path);
  })
  .reduce((obj, el) => ({ ...obj, ...el }), {});

const FIELDS_ACTION_HANDLERS_WITHOUT_FETCH = bl.createHandlersObjectWitoutFetch(
  { ...fieldsCreators.getActionsTypes() },
  "fieldsList"
);

const FIELDS_ACTION_HANDLERS = {
  ...FIELDS_ACTION_HANDLERS_WITH_FETCH,
  ...FIELDS_ACTION_HANDLERS_WITHOUT_FETCH,
};

const initialState = {
  fieldsList: null,
  status: statuses.INIT,
  errorMsg: null,
};

const fieldsReducer = (state = initialState, action) => {
  const handler = FIELDS_ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export { fieldsReducer };
