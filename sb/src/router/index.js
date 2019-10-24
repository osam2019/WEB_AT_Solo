import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'

Vue.use(VueRouter)


const requireAuth = (to, from, next) =>{
  if(!store.state.tk)
          next('/login')
  next()
} 

const routes = [
  /*
  {
    path: '/',
    name: 'test',
    //component: () => import(/* webpackChunkName: "about"  '../views/test.vue'),
    component: () => import(/* webpackChunkName: "about"  '../views/Night.vue'),
  },  
  */
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },  
  {
    path: '/view',
    name: 'view',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/View.vue'),
    beforeEnter: requireAuth,
  },    
  {
    path: '/night',
    name: 'night',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Night.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: requireAuth,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
