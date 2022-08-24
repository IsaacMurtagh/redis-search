#!/usr/bin/env node
const merchantsSearchClient = require('../merchantsSearchClient');

async function main() {
  const merchantName = process.argv[2];
  if (!merchantName) {
    throw('missing merchant name');
  }

  await merchantsSearchClient._connect();
  const results = await merchantsSearchClient.searchMerchantByName(merchantName);
  return results.documents.map(m => m.value);
}

main()
  .then(console.log)
  .catch(console.error)
  .then(() => process.exit(1));