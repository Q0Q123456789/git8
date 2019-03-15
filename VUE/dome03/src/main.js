import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import iView from "iview";
import "iview/dist/styles/iview.css";
import VueBarcode from '@xkeshi/vue-barcode'
import "./assets/css/common.less";

import Ajax from "@/api/ajax";

Vue.config.productionTip = false;
Vue.prototype.$Ajax = Ajax;
Vue.use(iView);
Vue.component('barcode', VueBarcode);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");