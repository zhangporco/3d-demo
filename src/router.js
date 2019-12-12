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
		// {
		// 	path: '/map',
		// 	component: () => import('./view/map/Index.vue'),
		// },
		// {
		// 	path: '/album', // 3d 旋转 相册
		// 	component: () => import('./view/album/Index3.vue'), 
		// },
		// {
		// 	path: '/album-info', // 3d 旋转 相册
		// 	component: () => import('./view/album/Info.vue'),
		// },
		{
			path: '/picture', // 3d 旋转 相册
			component: () => import('./view/picture/v3/Index3.vue'),
		},
		{
			path: '/test/1', // 3d 旋转 相册
			component: () => import('./view/test/Index1.vue'),
		},
		// {
		// 	path: '/audio', // 3d 旋转 相册
		// 	component: () => import('./view/picture/v3/audio/Audio.vue'),
		// },
	]
});

export default index;