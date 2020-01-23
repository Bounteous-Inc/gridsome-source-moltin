const { log, warn, success } = require('../lib/log');
const schema = require('../lib/schema');

const typeName = 'MoltinCategory';

module.exports = async ({ client, actions }) => {
  // Add schema types
  actions.addSchemaTypes(await schema('category'));
  const categories = actions.addCollection(typeName);

  // Fetch all data
  // See https://docs.moltin.com/api/catalog/products/get-all-products
  const { data } = await client.Categories.All();

  // Populate internal data store with fetched product data
  if (data.length === 0) {
    warn('No Categories Found');
    return;
  }

  data.forEach((category) => {
    const node = {
      id: category.id,
      type: category.type,
      name: category.name,
      slug: category.slug,
      description: category.description,
      status: category.status,
      created_at: category.meta.timestamps.created_at,
      updated_at: category.meta.timestamps.updated_at,
    };

    if (
      category.relationships.products
      && category.relationships.products.data
      && category.relationships.products.data.length > 0
    ) {
      node.products = category.relationships.products.data
        .map(({ id }) => actions.createReference('MoltinProduct', id));
    }

    categories.addNode(node);
  });

  success(`${typeName} × ${data.length}`);
};
