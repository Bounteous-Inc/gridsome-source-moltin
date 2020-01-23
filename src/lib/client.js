const { gateway, MemoryStorageFactory } = require('@moltin/sdk');

module.exports = (clientId) => gateway({
  client_id: clientId,
  storage: new MemoryStorageFactory(),
});
