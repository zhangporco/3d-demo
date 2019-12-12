/*
 * @Author: Porco
 * @Date: 2019-08-04 10:13:09
 * @LastEditTime: 2019-12-08 11:14:11
 * @Description: 请填写文件注释
 */
import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Router).use(ElementUI);

Vue.prototype.$msg = new Vue();

new Vue({
	router,
	render: h => h(App),
}).$mount('#app');
