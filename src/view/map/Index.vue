<template>
	<div>
		<!--<div id="three" class="three"></div>-->
		<!--<div class="img"></div>-->
		<img src=""/>
	</div>
</template>

<script>
	import * as THREE from 'three';
	export default {
		name: "ThreeD",
		mounted() {
			this.init();
		},
		methods: {
			init() {
				const scene = new THREE.Scene();
				const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
				const renderer=new THREE.WebGLRenderer({
					antialias: true,
					alpha: true
				});
				renderer.setSize(800, 500);
				renderer.setClearColor(0xb9d3ff, 0);//设置背景颜色
				document.getElementById('three').appendChild(renderer.domElement);//body元素中插入canvas对象
				
				const geometry = new THREE.BoxGeometry(0.1,2,0.1);
				const material = new THREE.MeshBasicMaterial({
					color: 'rgba(48,187,226,0.76)',
					transparent: true,
					opacity: 0.6,
					depthTest: true,
				});
				let edgesMtl =  new THREE.LineBasicMaterial({
					color: 0x0E30B9,
					opacity: 0.7,
					depthTest: true,
				});
				let cubeEdges = new THREE.EdgesGeometry(geometry, 1);
				// edgesMtl.depthTest = false; 深度测试，若开启则是边框透明的效果
				let cubeLine = new THREE.LineSegments(cubeEdges, edgesMtl);
				const cube = new THREE.Mesh(geometry, material);
				cube.add(cubeLine);
				cube.rotation.x = 0.3;
				cube.rotation.y = 0.8;
				scene.add(cube);
				
				camera.position.set(0, 0, 2);
				renderer.render(scene, camera);
			},
		},
	}
</script>

<style lang="scss" scoped>
	.three {
		height: 500px;
		width: 800px;
		background-image: url("../../../public/bg1.jpeg");
		background-size: 100% 100%;
		
	}
	.img {
		height: 200px;
		width: 50px;
		background-image: url("../../../public/cube.png");
		background-size: 100% 100%;
		opacity: 0.8;
		margin: -400px 0 0 100px;
	}
</style>