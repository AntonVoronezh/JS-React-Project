interface IField {
  id: number;
  name: string;
  title: string;
  type: string;
  isMultiple: boolean;
  isRequired: boolean;
  placeholder: string;
  configuration: any;
  _links: any;
  className: string;
}

export class Field {
  private id: number | Error;
  private name: string | Error;
  private title: string | Error;
  private type: string | Error;
  private isMultiple: boolean | Error;
  private isRequired: boolean | Error;
  private placeholder: string | Error;
  private configuration: any;
  private _links: any;
  private className: string;

  constructor({
    id,
    name,
    title,
    _links,
    type,
    isMultiple,
    isRequired,
    placeholder,
    configuration,
  }: IField) {
    this.id = id || new Error('Model instance not format -> required key "id"');
    this.name =
      name || new Error('Model instance not format -> required key "name"');
    this.title =
      title || new Error('Model instance not format -> required key "title"');
    this.type =
      type || new Error('Model instance not format -> required key "type"');
    this.isMultiple =
      isMultiple ||
      new Error('Model instance not format -> required key "isMultiple"');
    this.isRequired =
      isRequired ||
      new Error('Model instance not format -> required key "isRequired"');
    this.placeholder =
      placeholder ||
      new Error('Model instance not format -> required key "placeholder"');
    this.configuration =
      configuration ||
      new Error('Model instance not format -> required key "configuration"');
    this._links =
      _links || new Error('Model instance not format -> required key "_links"');
    this.className = "field";
  }

  get = (): any => ({
    id: this.id,
    name: this.name,
    title: this.title,
    type: this.type,
    isMultiple: this.isMultiple,
    isRequired: this.isRequired,
    placeholder: this.placeholder,
    configuration: this.configuration,
    _links: this._links,
    className: this.className,
  });

  set = ({
    id,
    name,
    title,
    _links,
    type,
    isMultiple,
    isRequired,
    placeholder,
    configuration,
  }: IField): void => {
    if (id) this.id = id;
    if (name) this.name = name;
    if (title) this.title = title;
    if (type) this.type = type;
    if (isMultiple) this.isMultiple = isMultiple;
    if (isRequired) this.isRequired = isRequired;
    if (placeholder) this.placeholder = placeholder;
    if (configuration) this.configuration = configuration;
    if (_links) this._links = _links;
  };
}
