import { WithActionsCreators } from "./WithActionsCreators";
import { partsOfWords } from "../../helpers/constants";

export class WithFunctions extends WithActionsCreators {
  constructor(props) {
    super(props);
    this.functionsNames = props.functionsNames;
    this.typesNames = props.typesNames;
  }

  _createFunctions = (list) => {
    let result = {};

    list.map((el) => {
      const functionName = this.formatForFunctionNames(el);
      const actionCreator = this._createActionCreators(this.typesNames)[
        functionName + partsOfWords.AC
      ];
      result = {
        ...result,
        [functionName]: (model) => (dispatch) => dispatch(actionCreator(model)),
      };

      return null;
    });

    return result;
  };

  getFunctions = () => this._createFunctions(this.functionsNames);
}
