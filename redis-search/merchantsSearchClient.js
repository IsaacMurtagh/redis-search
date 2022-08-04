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

  async createMerchantsIndex() {
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
        console.log('Index already exists');
      } else {
        throw err
      }
    });
  },

  async setMerchant(merchant) {
    await this._connect();
    return client.json.set(`merchants:${merchant.id}`, '$', merchant);
  },

  async searchMerchantByName(name) {
    await this._connect();
    return client.ft.search(merchantsIndex, name);
  },

  async searchMerchantByLatLng({ lat, lng }) {
    
  }
}