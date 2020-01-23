const { promisify } = require('util');
const { readFile } = require('fs').promises;
const { existsSync, createWriteStream } = require('fs');
const { join } = require('path');
const request = require('request');
const mime = require('mime-types');
const {
  log, warn, success, getProgressBar,
} = require('../lib/log');

const typeName = 'MoltinFile';

module.exports = async ({ client, actions, options }) => {
  // Add schema types
  actions.addSchemaTypes((await readFile(join(__dirname, 'file.graphql'))).toString());
  const files = actions.addCollection(typeName);

  // Fetch all data
  // See https://docs.moltin.com/api/catalog/products/get-all-products
  const { data } = await client.Files.All();

  if (data.length === 0) {
    warn('No Files Found');
    return;
  }

  // Populate internal data store with fetched product data
  const nodes = data.map((file) => ({
    id: file.id,
    type: file.type,
    href: file.link.href,
    file_name: file.file_name,
    mime_type: file.mime_type,
    file_size: file.file_size,
    public: file.public,
    width: file.meta.dimensions.width,
    height: file.meta.dimensions.height,
    created_at: file.meta.timestamps.created_at,
  }));

  if (options.downloadPath && existsSync(options.downloadPath)) {
    const bar = getProgressBar(typeName, data.length);

    for (const node of nodes) {
      const filePath = join(options.downloadPath, `${node.id}.${mime.extension(node.mime_type)}`);
      await new Promise((resolve) => {
        request(node.href).pipe(createWriteStream(filePath).on('close', resolve));
      });
      node.image = filePath;
      bar.tick();
    }
  }

  nodes.forEach(files.addNode);

  success(`${typeName} × ${data.length}`);
};
