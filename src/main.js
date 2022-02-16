import Vue from 'vue';
import '@/plugins/fontawesome';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/assets/tailwind.css';
import BaseButton from '@/components/BaseButton.vue';

Vue.config.productionTip = false;
Vue.component(BaseButton.name, BaseButton);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
