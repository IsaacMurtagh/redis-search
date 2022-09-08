const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const Merchant = require('./Merchant');
const searchClient = require('./merchantsSearchClient');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.post('/init', async (req, res) => {
  const merchants = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../ merchants.json'), 'UTF-8'))
  await searchClient._connect();
  await searchClient.createMerchantsSearchIndex();
  await Promise.all(merchants.map(async merchant => {
    return searchClient.setMerchant(Merchant.fromJson(merchant));
  }));
  return res.send('OK');
});

app.get('/merchants', async (req, res) => {
  const query = req.query.q || '*'
  const results = await searchClient.searchMerchantIndex(query);
  return res.send(results);
});


app.listen(port, () => console.log(`Server available on http://localhost:${port}`))
