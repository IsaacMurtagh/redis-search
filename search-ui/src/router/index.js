import { createRouter, createWebHistory } from 'vue-router'
import SearchNameView from '../views/SearchNameView.vue'

const routes = [
  {
    path: '/',
    alias: '/search-by-name',
    name: 'Search By Name',
    component: SearchNameView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
