<template>
  <div>
      <input v-model="query" type="search">
      <button @click="search">Search</button>
  </div>
</template>

<script>
import redisClient from '@/redisClient';

export default {
  name: 'HomeView',
  data() {
    return {
      query: ''
    }
  },
  methods: {
    async search() {
      console.log(await redisClient.searchMerchantsByQuery(this.query))
    }
  }
}
</script>
