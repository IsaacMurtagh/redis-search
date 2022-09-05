import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 1000,
});

export default {
  async searchMerchants(q) {
    return axiosClient.get('merchants/search', {
      params: { q }
    });
  }
};