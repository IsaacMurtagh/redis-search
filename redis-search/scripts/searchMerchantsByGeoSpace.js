#!/usr/bin/env node
const merchantsSearchClient = require('../merchantsSearchClient');

async function main() {
  const lng = process.argv[2];
  const lat = process.argv[3];
  const radius = process.argv[4];
  if (!lng || !lat || !radius) {
    throw('missing lng, lat, or ');
  }

  await merchantsSearchClient._connect();
  return await merchantsSearchClient.searchMerchantByGeo({ lat, lng, radius });
  // return results.documents.map(m => m.value);
}

main()
  .then(console.log)
  .catch(console.error)
  .then(() => process.exit(1));