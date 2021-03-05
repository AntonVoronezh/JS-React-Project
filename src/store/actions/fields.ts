import { dal } from "../../helpers/libs/dal";
import { mySchema } from "../../helpers/shemas";
import { ForRedux } from "../redux-lib";

const fieldsCreators = new ForRedux({
  RSAANames: [{ type: "fields" }],
  functionsNames: ["delete field", "edit field", "add field"],
  typesNames: ["set fields from local storage"],
});

const fetchFields = ():void =>
// @ts-ignore
  dal.get({
    object: fieldsCreators,
    endpoint: "fields",
    namespace: "fields",
    part: "fields",
    shema: mySchema,
  });

export { fetchFields, fieldsCreators };
