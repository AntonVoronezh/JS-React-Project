import {
  values as _values,
  size as _size,
  keyBy as _keyBy,
  keys as _keys,
  map as _map,
  get as _get,
  isEqual as _isEqual,
// @ts-ignore
} from "lodash";

class UI {
  calcDefaultPagesCountForTable = ({ list, number }) =>
    _size(list) < number ? _size(list) : number;

  getObjectValues = ({ object }) => [..._values(object)];

  getHashFromObjectBySelector = ({ object, selector }) => ({
    ..._keyBy(object, selector),
  });

  transformToFormatForSelectFromTypes = ({ types }) =>
    _map(_keys(types), (t) => ({ value: _get(types, t), label: t }));

  transformToFormatForSelectFromList = ({ list }) =>
    _map(_keys(list), (t) => ({ value: t, label: _get(list[t], "title") }));

  getValuesFromListForDefault = ({ list, defaultArr }) =>
    _map(defaultArr, (v) => list[v]);

  getIdArrFromFormattedObject = ({ list }) =>
    _map(list, (v) => +_get(v, "value"));

  getLocalItem = ({ name }) => JSON.parse(localStorage.getItem(name));

  setLocalItem = ({ name, item }) =>
    localStorage.setItem(name, JSON.stringify(item));

  getData = ({ item, setFunc, fetchFunc }) => {
    if (this.getLocalItem({ name: item })) {
      setFunc(this.getLocalItem({ name: item }));
    } else {
      fetchFunc();
    }
  };

  updateLocal = ({ list, prevList, item }) => {
    if (!this.getLocalItem({ name: item }) || !_isEqual(list, prevList)) {
      this.setLocalItem({ name: item, item: list });
    }
  };
}

const ui = new UI();

export default ui;

export { ui };
