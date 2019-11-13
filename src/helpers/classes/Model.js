export class Model {
	constructor({ id, name, title, _links, fields }) {
		this.id = id || new Error('Model instance not format -> required key "id"');
		this.name = name || new Error('Model instance not format -> required key "name"');
		this.title = title || new Error('Model instance not format -> required key "title"');
		this._links = _links || new Error('Model instance not format -> required key "_links"');
		this.fields = fields || null;
		this.className = 'model';
	}

	get = () => ({
		id: this.id,
		name: this.name,
		title: this.title,
		_links: this._links,
		fields: this.fields,
		className: this.className,
	});

	set = ({ id, name, title, _links, fields }) => {
		if (id) this.id = id;
		if (name) this.name = name;
		if (title) this.title = title;
		if (_links) this._links = _links;
		if (fields) this.fields = fields;
	};
}
