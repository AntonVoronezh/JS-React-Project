interface IModel {
  id: number;
  name: string;
  title: string;
  _links: any;
  fields: any;
  className: string;
}

export class Model {
  private id: number | Error;
  private name: string | Error;
  private title: string | Error;
  private _links: any;
  private fields: any;
  private className: string;

  constructor({ id, name, title, _links, fields }: IModel) {
    this.id = id || new Error('Model instance not format -> required key "id"');
    this.name =
      name || new Error('Model instance not format -> required key "name"');
    this.title =
      title || new Error('Model instance not format -> required key "title"');
    this._links =
      _links || new Error('Model instance not format -> required key "_links"');
    this.fields = fields || null;
    this.className = "model";
  }

  get = (): any => ({
    id: this.id,
    name: this.name,
    title: this.title,
    _links: this._links,
    fields: this.fields,
    className: this.className,
  });

  set = ({ id, name, title, _links, fields }): void => {
    if (id) this.id = id;
    if (name) this.name = name;
    if (title) this.title = title;
    if (_links) this._links = _links;
    if (fields) this.fields = fields;
  };
}
