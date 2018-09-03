
import Main from '@/views/Mian.vue'

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home_page',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home_page',
        name: 'home_page',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true
        },
        component: () => import('@/views/Home/Home.vue')
      }
    ]
  },
  {
    path: '/About',
    name: 'About',
    component: Main,
    children: [
      {
        path: '/about_page',
        name: 'about_page',
        component: () => import('@/views/About/About.vue')
      }
    ]
  }
]
