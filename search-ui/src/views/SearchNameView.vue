<template>
  <div>
    <form @submit.prevent="search">
      <input v-model="query" type="search">
      <button type="submit">Search</button>
    </form>
    <p>http://localhost:3001/merchants?q={{this.query}}</p>
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
    }
  },
  methods: {
    async search() {
      const results = await apiClient.searchMerchants(this.query)
      this.merchants = results.data.documents.map(d => {
        return {id: d.id, ...d.value }
      })
    }
  }
}
</script>
<style>
pre {
  text-align: left;
}
</style>