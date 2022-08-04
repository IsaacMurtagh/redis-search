#!/usr/bin/env node
const merchantsSearchClient = require('../merchantsSearchClient');

async function main() {
  const lat = process.argv[2];
  const lng = process.argv[3];
  if (!lat || !lng) {
    console.error('missing lat or lng');
    process.exit(1);
  }

  console.log(lat, lng);

  await merchantsSearchClient._connect();
  const results = await merchantsSearchClient.searchMerchantByLatLng({ lat, lng });
  return results.documents.map(m => m.value);
}

main()
  .then(console.log)
  .catch(console.error)
  .then(() => process.exit(1));