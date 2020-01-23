const { log, warn, success } = require('../lib/log');
const schema = require('../lib/schema');

const typeName = 'MoltinBrand';

module.exports = async ({ client, actions }) => {
  // Add schema types
  actions.addSchemaTypes(await schema('brand'));
  const brands = actions.addCollection(typeName);

  // Fetch all data
  // See https://docs.moltin.com/api/catalog/products/get-all-products
  const { data } = await client.Brands.All();

  // Populate internal data store with fetched product data
  if (data.length === 0) {
    warn('No Brands Found');
    return;
  }

  data.forEach((brand) => {
    const node = {
      id: brand.id,
      type: brand.type,
      name: brand.name,
      slug: brand.slug,
      description: brand.description,
      status: brand.status,
      created_at: brand.meta.timestamps.created_at,
      updated_at: brand.meta.timestamps.updated_at,
    };

    if (
      brand.relationships.products
      && brand.relationships.products.data
      && brand.relationships.products.data.length > 0) {
      node.products = brand.relationships.products.data
        .map(({ id }) => actions.createReference('MoltinProduct', id));

      log(node.products);
    }

    brands.addNode(node);
  });

  success(`${typeName} × ${data.length}`);
};
