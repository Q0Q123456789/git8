
import Main from '@/views/Mian.vue'

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    hidden: true
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home_page',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true,
      title: '首页',
      name:'1'
    },
    children: [
      {
        path: '/home_page',
        name: 'home_page',
        meta: {
          title: '首页',
          name: '1-1'
        },
        component: () => import('@/views/Home/Home.vue')
      }
    ]
  },
  {
    path: '/About',
    name: 'About',
    component: Main,
    meta: {
      title: '子页',
      notCache: true,
      name:'2'
    },
    children: [
      {
        path: '/about_page',
        name: 'about_page',
        meta: {
          title: '子页',
          name: '2-1'
        },
        component: () => import('@/views/About/About.vue')
      }
    ]
  }
]
