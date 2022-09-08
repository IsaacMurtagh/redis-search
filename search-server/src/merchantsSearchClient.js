const { createClient, SchemaFieldTypes, } = require('redis');
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
      'name': {
        type: SchemaFieldTypes.TEXT,
        sortable: true
      },
      'city': {
        type: SchemaFieldTypes.TAG,
      },
      'region': {
        type: SchemaFieldTypes.TAG,
      },
      'test': {
        type: SchemaFieldTypes.TAG,
      },
      'lngLat': {
        type: SchemaFieldTypes.GEO,
      },
      'createdAt': {
        type: SchemaFieldTypes.NUMERIC,
      }
    }, {
      PREFIX: 'merchants:'
    }).catch(err => {
      if (err.message === 'Index already exists') {
        console.log(err.message);
      } else {
        throw err
      }
    });
  },

  async setMerchant(merchant) {
    await this._connect();
    return client.sendCommand(['HSET', `merchants:${merchant.id}`, '1.0', 'FIELDS', ...merchant.toRedisFields()])
      .catch(console.error);
  },

  async searchMerchantIndex({ query, sortBy, sort }) {
    console.log({ query, sortBy, sort });
    await this._connect();
    return client.ft.search(merchantsIndex, query, {
    }).catch(err => {
      console.error(err);
      // throw err;
    });
  },
}