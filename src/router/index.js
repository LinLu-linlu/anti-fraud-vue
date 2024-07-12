import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/main',
      component: () => import('../views/MainView.vue'),
      children: [
        {
          path: '',
          component: () => import('../components/IndexPage.vue')
        },
        {
          path: 'index',
          name: 'index',
          component: () => import('../components/IndexPage.vue')
        },
        {
          path: 'articles-manage',
          name: 'aticles',
          component: () => import('../components/ArticlePage.vue')
        },
        {
          path: 'users-manage',
          name: 'users',
          component: () => import('../components/UserPage.vue')
        },
        {
          path: 'questions-manage',
          name: 'qursions',
          component: () => import('../components/QuestionPage.vue')
        }
      ],
    }
  ]
})

export default router
