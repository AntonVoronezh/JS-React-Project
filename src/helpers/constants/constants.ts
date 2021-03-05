const statuses = Object.freeze({
  INIT: "INIT",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  REQUEST: "REQUEST",
  ERROR: "ERROR",
});

const pagesCount = Object.freeze({
  MODELS: 5,
  FIELDS: 8,
});

const types = Object.freeze({
  relation: "RELATION",
  string: "STRING",
});

const path = Object.freeze({
  models: "models",
  fields: "fields",
  list: "list",
  create: "create",
  edit: "edit",
  id: "id",
});

const languages = Object.freeze(["en", "ru"]);

const partsOfWords = Object.freeze({
  FETCH: "FETCH",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  REQUEST: "REQUEST",
  AC: "AC",
  ADD: "ADD",
  DELETE: "DELETE",
  EDIT: "EDIT",
  SYNC: "SYNC",
  MODELS: "MODELS",
  FIELDS: "FIELDS",
});

const widthsForTable = Object.freeze({ half: 50, full: 100 });

const syncTime = Object.freeze({
  timeInMiliseconds: 10000,
  startRandomNumberForWindowId: 1,
  finishRandomNumberForWindowId: 100000,
  firstTimeForSyncWithFetchErrors: 10000,
  secondTimeForSyncWithFetchErrors: 30000,
  thirdTimeForSyncWithFetchErrors: 60000,
  fourthTimeForSyncWithFetchErrors: 180000,
  fiveTimeForSyncWithFetchErrors: 300000,
});

export {
  statuses,
  pagesCount,
  types,
  path,
  languages,
  partsOfWords,
  widthsForTable,
  syncTime,
};
