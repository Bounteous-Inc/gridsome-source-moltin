const { readFile } = require('fs').promises;
const { join } = require('path');

module.exports = async function getSchema(requestor) {
  const path = join(__dirname, '../schema', `${requestor}.graphql`);
  return (await readFile(path)).toString();
};
