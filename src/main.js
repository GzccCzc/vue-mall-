import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import { Swipe, SwipeItem } from 'vant';

Vue.config.productionTip = false
Vue.use(Swipe).use(SwipeItem);
new Vue({
  el:'#app',
  router,
  render: h => h(App),
})

