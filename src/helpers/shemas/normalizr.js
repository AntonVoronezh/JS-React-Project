import { schema } from 'normalizr';

const idSchema = new schema.Entity('id');
const mySchema = new schema.Array(idSchema);

export { mySchema };