import APP from '../App';
const router = [
    {
        layout: 'Home',
        name: '首页',
        path: '/',
        component: APP,
        children:[
            {
                name: '首页',
                path: '/Home_page',
                meta: {
                    title: '详情',
                    name: '1-1'
                },
                component: ()=>import('../components/Home'),
                children:[
                    {
                        path: '/HomeHeader',
                        name: 'HomeHeader',
                        meta: {
                            title: '详情',
                            name: '1-1'
                        },
                        component: () => import('../components/home/HomeHeader')
                    }
                ]
            }
        ]
    },
    {
        name: '子页',
        path: '/News',
        component: APP,
        children:[
            {
                path: '/News_page',
                name: 'News',
                meta: {
                    title: '详情',
                    name: '1-1'
                },
                component: ()=>import('../components/News')
            }
        ]
    },
    {
        layout: 'Footer',
        name: '子页',
        path: '/Footer',
        component: APP,
        children:[
            {
                path: '/Footer_page',
                name: 'Footer',
                meta: {
                    title: '详情',
                    name: '1-1'
                },
                component: ()=>import('../components/Footer')
            }
        ]
    },
    {
        layout: 'Header',
        name: '子页',
        path: '/Header',
        component: APP,
        children:[
            {
                path: '/Headerr_page',
                name: 'Header',
                meta: {
                    title: '详情',
                    name: '1-1'
                },
                component:  ()=>import('../components/Header')
            }
        ]
    }
]

export default router;