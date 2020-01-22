const { MoltinClient } = require('@moltin/request');
const { log, warn, success } = require('./lib/log');

class MoltinSource {
  static defaultOptions() {
    return {
      clientId: null,
    };
  }

  constructor(api, { clientId }) {
    if (clientId === null) {
      warn('No `client_id` was provided, therefore no products will be imported');
      return;
    }

    const client = new MoltinClient({
      client_id: clientId,
    });

    api.loadSource(async (actions) => {
      const { data } = await client.get('products');

      if (data.length > 0) {
        const collection = actions.addCollection({
          typeName: 'MoltinProduct',
        });

        data.forEach(collection.addNode);
      }

      success('Success');
    });
  }
}

module.exports = MoltinSource;
