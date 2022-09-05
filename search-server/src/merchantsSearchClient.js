const { createClient, SchemaFieldTypes } = require('redis');
const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));

const merchantsIndex = 'idx:merchants';

module.exports = {
  
  _initialized: false,
  async _connect() {
    if (!this._initialized) {
      await client.connect();
      this._initialized = true;
    }
  },

  async createMerchantsSearchIndex() {
    await this._connect();
    return client.ft.create(merchantsIndex, {
      '$.name': {
        type: SchemaFieldTypes.TEXT,
        SORTABLE: 'UNF'
      },
    }, {
      ON: 'JSON',
      PREFIX: 'merchants'
    }).catch(err => {
      if (err.message === 'Index already exists') {
        console.log(err.message);
      } else {
        throw err
      }
    });
  },

  async addMerchantToGeoIndex(merchant) {
    await this._connect();
    await client.GEOADD('merchants', {
      longitude: String(merchant.lng),
      latitude: String(merchant.lat),
      member: merchant.id
    })
    return;
  },

  async setMerchant(merchant) {
    await this._connect();
    return client.json.set(`merchants:${merchant.id}`, '$', merchant);
  },

  async getMerchant(id) {
    await this._connect();
    return client.json.get(`merchants:${id}`);
  },

  async searchMerchantIndex(query) {
    await this._connect();
    return client.ft.search(merchantsIndex, query, {
      LIMIT: {
        from: '0',
        size: '100'
      }
    });
  },

  async searchMerchantByGeo({ lat, lng, radius }) {
    await this._connect();
    return client.sendCommand([ 
      'GEOSEARCH',
      'merchants',
      'FROMLONLAT',
      lng,
      lat,
      'BYRADIUS',
      radius,
      'm',
      'ASC'
    ]);
  }
}