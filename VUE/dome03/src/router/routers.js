
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
      name:'1',
      ioc:'ios-navigate'
    },
    children: [
      {
        path: '/home_page',
        name: 'home_page',
        meta: {
          title: '首页',
          husband:'1',
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
      title: '创库管理',
      notCache: true,
      name:'2',
      ioc:'ios-keypad'
    },
    children: [
      {
        path: '/uploadExcel_page',
        name: 'uploadExcel_page',
        meta: {
          title: '导入数据',
          husband:'2',
          name: '2-1'
        },
        component: () => import('@/views/Excel/uploadExcel.vue')
      },
      {
        path: '/about_page',
        name: 'about_page',
        meta: {
          title: '添加数据',
          husband:'2',
          name: '2-2'
        },
        component: () => import('@/views/About/About.vue')
      }
      
    ]
  },
  {
    path: '/Personnel',
    name: 'Personnel',
    component: Main,
    meta: {
      title: '人员管理',
      notCache: true,
      name:'3',
      ioc:'ios-contact-outline'
    },
    children: [
      {
        path: '/personnel_page',
        name: 'personnel_page',
        meta: {
          title: '编辑员工',
          husband:'3',
          name: '3-1'
        },
        component: () => import('@/views/Personnel/Personnel.vue')
      },
      {
        path: '/AddPersonnel_page',
        name: 'AddPersonnel_page',
        meta: {
          title: '增加员工',
          husband:'3',
          name: '3-2'
        },
        component: () => import('@/components/AddPersonnel.vue')
      }
    ]
  },
  {
    path: '/Order',
    name: 'Order',
    component: Main,
    meta: {
      title: '订单管理',
      notCache: true,
      name:'4',
      ioc:'ios-copy-outline'
    },
    children: [
      {
        path: '/Order_page',
        name: 'Order_page',
        meta: {
          title: '编辑订单',
          husband:'4',
          name: '4-1'
        },
        component: () => import('@/views/Order/Order.vue')
      },
      {
        path: '/AddOrder_page',
        name: 'AddOrder_page',
        meta: {
          title: '增加订单',
          husband:'4',
          name: '4-2'
        },
        component: () => import('@/components/AddOrder.vue')
      }
    ]
  }
]
