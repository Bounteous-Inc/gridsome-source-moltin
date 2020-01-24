const { log, warn, success } = require('../lib/log');
const schema = require('../lib/schema');

const typeName = 'MoltinProduct';

module.exports = async ({ client, actions }) => {
  // Add schema types
  actions.addSchemaTypes(await schema('file'));
  const products = actions.addCollection(typeName);
  const prices = actions.addCollection('MoltinPrice');

  // Fetch all data
  // See https://docs.moltin.com/api/catalog/products/get-all-products
  const { data } = await client.Products.All();

  // Populate internal data store with fetched product data
  if (data.length === 0) {
    warn('No Products Found');
    return;
  }

  data.forEach((product) => {
    const node = {
      id: product.id,
      sku: product.sku,
      slug: product.slug,
      name: product.name,
      description: product.description,
      manage_stock: product.manage_stock,
      status: product.status,
      commodity_type: product.commodity_type,
      created_at: product.meta.timestamps.created_at,
      updated_at: product.meta.timestamps.updated_at,
      price: product.price.map((price, index) => actions.createReference(
        prices.findNode(price) || prices.addNode(price),
      )),
    };

    if (product.relationships.main_image) {
      node.main_image = actions.createReference(
        'MoltinFile',
        product.relationships.main_image.data.id,
      );
    }

    products.addNode(node);
  });

  success(`${typeName} × ${data.length}`);
};
