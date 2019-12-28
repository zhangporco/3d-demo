/*
 * @Author: Porco
 * @Date: 2019-09-09 14:11:49
 * @LastEditTime: 2019-12-10 23:06:05
 * @Description: 请填写文件注释
 */
import Router from 'vue-router';

const index = new Router({
	// mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/picture',
		},
		{
			path: '/picture',
			component: () => import('./view/picture/v3/Index3.vue'),
		},
		{
			path: '/test/iat',
			component: () => import('./view/test/Iat.vue'),
		},
		{
			path: '/test/triangle',
			component: () => import('./view/test/Triangle.vue'),
		},
	]
});

export default index;