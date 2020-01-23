const { log, warn, success } = require('../lib/log');
const schema = require('../lib/schema');

const typeName = 'MoltinCollection';

module.exports = async ({ client, actions }) => {
  // Add schema types
  actions.addSchemaTypes(await schema('collection'));
  const collections = actions.addCollection(typeName);

  // Fetch all data
  // See https://docs.moltin.com/api/catalog/products/get-all-products
  const { data } = await client.Collections.All();

  // Populate internal data store with fetched product data
  if (data.length === 0) {
    warn('No Collections Found');
    return;
  }

  data.forEach((collection) => {
    const node = {
      id: collection.id,
      type: collection.type,
      name: collection.name,
      slug: collection.slug,
      description: collection.description,
      status: collection.status,
      created_at: collection.meta.timestamps.created_at,
      updated_at: collection.meta.timestamps.updated_at,
    };

    if (
      collection.relationships.products
      && collection.relationships.products.data
      && collection.relationships.products.data.length > 0
    ) {
      node.products = collection.relationships.products.data
        .map(({ id }) => actions.createReference('MoltinProduct', id));
    }

    collections.addNode(node);
  });

  success(`${typeName} × ${data.length}`);
};
