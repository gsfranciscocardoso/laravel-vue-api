import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {  
    path: '/',
    redirect: '/home'
  },
  {  
    path: '/home',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
    meta: { requiresAuth: true }
  },
  {  
    path: '/users',
    name: 'users',
    component: () => import('@/pages/users/UserIndex.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/About.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/auth/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token')
  const roles = JSON.parse(localStorage.getItem('roles') || '[]')

  if (to.meta.requiresAuth && !token) {
    return next({ name: 'login' })
  }

  if (to.meta.roles) {
    // Check if user has any of the required roles
    const allowed = to.meta.roles.some(role => roles.includes(role))
    if (!allowed) {
      return next({ name: 'home' }) // or redirect to "Access Denied" page
    }
  }

  next()
})
export default router
