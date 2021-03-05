import { WithRSAA } from "./WithRSAA";

export class ForRedux extends WithRSAA {
  constructor(props) {
    super({
      RSAANames: props.RSAANames,
      functionsNames: [...props.typesNames, ...props.functionsNames],
      typesNames: [...props.typesNames, ...props.functionsNames],
    });
  }
}
