import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import FAQ from '../views/FAQ.vue';
import Contact from '../views/Contact.vue';
import Privacy from '../views/Privacy.vue';
import TOS from '../views/TOS.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/FAQ',
    name: 'FAQ',
    component: FAQ
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy
  },
  {
    path: '/TOS',
    name: 'TOS',
    component: TOS
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
