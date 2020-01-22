const { warn } = require('./lib/log');

class MoltinSource {
  static defaultOptions() {
    return {
      clientId: null,
    };
  }

  constructor(api, { clientId }) {
    if (clientId === null) {
      warn('No `client_id` was provided, therefore no products will be imported');
    }
  }
}

module.exports = MoltinSource;
