import {
  split as _split,
  join as _join,
  upperFirst as _upperFirst,
  upperCase as _upperCase,
  words as _words,
} from "lodash";

export class WithFormats {
  formatForTypes = (text) => _join(_split(_upperCase(text), " "), "_");

  formatForFunctionNames = (text) =>
    _join(
      _words(text).map((w, i) => (i === 0 ? w : _upperFirst(w))),
      ""
    );
}
