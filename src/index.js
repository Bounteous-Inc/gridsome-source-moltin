const { log, warn, success } = require('./lib/log');
const types = require('./types');

class MoltinSource {
  static defaultOptions() {
    return {
      clientId: null,
      downloadPath: null,
    };
  }

  constructor(api, options) {
    if (options.clientId === null) {
      warn('No `client_id` was provided, therefore no products will be imported');
      return;
    }

    const client = require('./lib/client')(options.clientId);

    api.loadSource(async (actions) => {
      for (const type of types) {
        await type({ client, actions, options });
      }

      success('Success');
    });
  }
}

module.exports = MoltinSource;
