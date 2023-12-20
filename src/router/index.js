import { createRouter, createWebHistory } from 'vue-router'
import navbar from '../components/navbar.vue'
import Home from '../components/Home.vue'
import QueryView from '../views/QueryView.vue'
import AllBook from '../components/AllBook.vue'
import Author from '../components/Author.vue'
import Genre from '../components/Genre.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/book',
      name: 'allbook',
      component: AllBook
    },
    {
      path: '/author',
      name: 'author',
      component: Author
    },
    {
      path: '/genre',
      name: 'genre',
      component: Genre
    },
    {
      path: '/query/:id',
      name: 'query',
      component: QueryView
    },

  ]
})

export default router
