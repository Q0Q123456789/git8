import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import 'vue-tree-halower/dist/halower-tree.min.css' // you can customize the style of the tree
import {
  VTree,
  VSelectTree
} from 'vue-tree-halower'

import './assets/css/common.less'

import Ajax from '@/api/ajax';

Vue.config.productionTip = false
Vue.prototype.$Ajax = Ajax
Vue.use(iView);
Vue.use(Antd)
Vue.use(VTree)
Vue.use(VSelectTree)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')