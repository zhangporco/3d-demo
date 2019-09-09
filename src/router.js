import Router from 'vue-router';

const index = new Router({
	// mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/album',
		},
		// {
		// 	path: '/map',
		// 	component: () => import('./view/map/Index.vue'),
		// },
		{
			path: '/album', // 3d 旋转 相册
			component: () => import('./view/album/Index3.vue'),
		},
		{
			path: '/album-info', // 3d 旋转 相册
			component: () => import('./view/album/Info.vue'),
		},
	]
});

export default index;