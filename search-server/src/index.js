const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const searchClient = require('./merchantsSearchClient');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/init', async (req, res) => {
  const merchants = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../ merchants.json'), 'UTF-8'));
  await searchClient._connect();
  await searchClient.createMerchantsSearchIndex();
  await Promise.all(merchants.map(async merchant => {
    await searchClient.setMerchant(merchant);
    if (merchant.lng && merchant.lat) {
      await searchClient.addMerchantToGeoIndex(merchant);
    }
  }));
  return res.send('OK');
});

app.get('/merchants/search', async (req, res) => {
  const query = req.query.q
  const results = await searchClient.searchMerchantIndex(query);
  return res.send(results);
});
app.get('/merchants/location', async (req, res) => {
  const { lng, lat, radius } = req.query;
  const results = await searchClient.searchMerchantByGeo({ lat, lng, radius });
  const merchants = await Promise.all(results.map(async id => searchClient.getMerchant(id)))
  return res.send(merchants);
});

app.get('/merchants/:id', async (req, res) => {
  const merchant = await searchClient.getMerchant(req.params.id);
  return res.send(merchant);
});


app.listen(port, () => console.log(`Server available on http://localhost:${port}`))
