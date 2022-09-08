<template>
  <div>
    <form @submit.prevent="search">
      <div>
        <label>
          Search
          <input v-model="query" type="search">
        </label>
        <button type="submit">Search</button>
      </div>
    </form>
    <p>http://localhost:3001/merchants?q={{this.query}}</p>
    <p>Showing {{this.merchants.length}}/{{this.totalDocuments}} results</p>
    <pre>
      {{ this.merchants }}
    </pre>
  </div>
</template>

<script>
import apiClient from '@/apiClient.js';

export default {
  name: 'HomeView',
  data() {
    return {
      query: '',
      merchants: [],
      totalDocuments: 0,
    }
  },

  methods: {
    async search() {
      this.merchants = [];
      this.totalDocuments = 0;
      const results = await apiClient.searchMerchants({ 
        q: this.query,
        sortBy: this.sortByName && 'name',
        sort: this.sortByName,
      })
      this.merchants = results.data.documents.map(d => {
        return {id: d.id, ...d.value }
      })
      this.totalDocuments = results.data.total;
    }
  }
}
</script>
<style>
pre {
  text-align: left;
}
</style>