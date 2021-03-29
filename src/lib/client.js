const { gateway, MemoryStorageFactory } = require('@moltin/sdk');

module.exports = ({ host, clientId }) => gateway({
  host,
  client_id: clientId,
  storage: new MemoryStorageFactory(),
});
