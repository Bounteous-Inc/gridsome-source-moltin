const { warn } = require('./lib/log');
const types = require('./lib/types');

class MoltinSource {
  static defaultOptions() {
    return {
      host: undefined,
      clientId: null,
      downloadPath: null,
    };
  }

  constructor(api, options) {
    if (options.clientId === null) {
      warn('No `client_id` was provided, therefore no data will be imported');
      return;
    }

    const client = require('./lib/client')(options);

    api.loadSource(async (actions) => {
      for (const type of types) {
        await type({ client, actions, options });
      }
    });
  }
}

module.exports = MoltinSource;
