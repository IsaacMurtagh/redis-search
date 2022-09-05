import { createRouter, createWebHistory } from 'vue-router'
import SearchLocationView from '../views/SearchLocationView.vue'
import SearchNameView from '../views/SearchNameView.vue'

const routes = [
  {
    path: '/',
    alias: '/search-by-name',
    name: 'Search By Name',
    component: SearchNameView
  },
  {
    path: '/search-by-location',
    name: 'Search By Location',
    component: SearchLocationView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
