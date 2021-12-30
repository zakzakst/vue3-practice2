import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import '@/plugins/vee-validate';
import '@/plugins/axios';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@/plugins/composition-api';
import * as directives from '@/directives';
import * as components from '@/components';

Vue.config.productionTip = false;

// import { myExample } from '@/directives/my-example';
// Vue.directive('myExample', myExample);

for (const [key, directive] of Object.entries(directives)) {
  Vue.directive(key, directive);
}
for (const [key, component] of Object.entries(components)) {
  Vue.component(key, component);
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
