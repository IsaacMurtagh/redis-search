#!/usr/bin/env node
const merchantsSearchClient = require('../src/merchantsSearchClient');
const fs = require('fs');
const path = require('path');

async function main() {
  const merchants = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../ merchants.json'), 'UTF-8'));
  await merchantsSearchClient._connect();
  await merchantsSearchClient.createMerchantsSearchIndex();
  await Promise.all(merchants.map(async merchant => merchantsSearchClient.setMerchant(merchant)));

  
  return 'done'
}

main()
  .then(console.log)
  .catch(console.error)
  .then(() => process.exit(1));