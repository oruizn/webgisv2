import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//添加样式
import 'ol/ol.css'
import 'ol-ext/dist/ol-ext.css'


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
