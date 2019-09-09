import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Router).use(ElementUI);

new Vue({
	router,
	render: h => h(App),
}).$mount('#app');
