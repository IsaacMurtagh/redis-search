<template>
  <div>
    <button @click="centrapayOfficeQuery">5k from Centrapay office</button>
    <button @click="nonTestCentrapay">All non test merchants with Centrapay in their name</button>
    <button @click="merchantsSinceAugust">All Merchants created since start of August</button>
    <form @submit.prevent="search">
      <div>
        <label>
          Search
          <input v-model="query" type="search" style="width:500px;margin-top:12px">
        </label>
        <button type="submit">Search</button>
      </div>
    </form>
    <p>http://localhost:3001/merchants?q={{encodeURIComponent(this.query)}}</p>
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
        return { 
          ...d.value,
          createdAt: Number(d.value.createdAt) ? new Date(Number(d.value.createdAt)).toString() : undefined
        }
      })
      this.totalDocuments = results.data.total;
    },

    centrapayOfficeQuery() {
      this.query = '@lngLat:[ 174.7580875711637 -36.8591016830896 5 km]'
    },

    nonTestCentrapay() {
      this.query = 'Centrapay@test:{false}'
    },

    merchantsSinceAugust() {
      this.query = '@createdAt:[1659312000000 inf]'
    }
  }
}
</script>
<style>
pre {
  text-align: left;
}
</style>