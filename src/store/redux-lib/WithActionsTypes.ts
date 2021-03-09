import { WithFormats } from "./WithFormats";

export class WithActionsTypes extends WithFormats {
  constructor(props) {
    super();
    this.typesNames = props.typesNames;
  }

  _createActionsTypes = (list) => {
    let result = {};

    list.map((el) => {
      const name = this.formatForTypes(el);
      result = { ...result, [name]: name };

      return null;
    });

    return result;
  };

  getActionsTypes = () => this._createActionsTypes(this.typesNames);
}
