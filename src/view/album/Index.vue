<template>
	<div class="my-container">  <!-- 大容器 -->
		<p class="title" v-show="showAlbum">总体规划</p>
		<div class="container" v-show="showAlbum">   <!-- 相册容器 -->
			<div v-for="(v, i) of images" :key="i"
			     v-bind:class="'img ' + v.class"
			     @click="clickImg(v.index)"
			     :style="{animationPlayState: playState}"></div>
		</div>
		<v-info v-show="!showAlbum" :type="type" @back="back"/>
	</div>
</template>

<script>
	import vInfo from './Info';
	
	export default {
		components: {
			vInfo,
		},
		data() {
			return {
				playState: 'running',
				type: 0,
				showAlbum: true,
				images: [
					{
						class: 'img01',
						index: 1,
					},
					{
						class: 'img02',
						index: 2,
					},
					{
						class: 'img03',
						index: 3,
					},
					{
						class: 'img04',
						index: 4,
					},
					{
						class: 'img05',
						index: 5,
					},
					{
						class: 'img06',
						index: 6,
					},
				],
			}
		},
		mounted() {
		
		},
		methods: {
			clickImg(i) {
				console.log(i);
				// if (this.playState === 'running') {
				// 	this.playState = 'paused';
				// } else {
				// 	this.playState = 'running';
				// }
				const start = this.images.slice(i - 1, this.images.length);
				const end = this.images.slice(0, i - 1);
				this.images = [...start, ...end];
				console.log(this.images);
				
				this.type = i;
				this.showAlbum = false;
			},
			back() {
				
				setTimeout(()  => {
					this.showAlbum = true;
				}, 1000);
				setTimeout(()  => {
					this.playState = 'running';
				}, 1000);
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	$speed: 40s;
	$translateZ: 520px;
	
	.my-container {
		width: 100%;
		height: 100%;
		background-image: url("../../../public/bg3.png");
		background-size: 100% 100%;
		.title {
			position: absolute;
			top: 50px;
			left: 126px;
			color: #fff;
			font-size: 50px;
		}
	}
	
	.container {
		width: 100%;
		height: 100%;
		position: relative;
		transform-style: preserve-3d;
		display: flex;
		justify-content: center;
	}
	
	.img {
		width: 420px;
		height: 700px;
		text-align: center;
		position: absolute;
		margin-top: 8%;
		cursor: pointer;
		background-size: 100% 100%;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.9) inset;
	}
	
	.img01 {
		background-image: url("../../../public/1/index.png");
		transform: rotateY(0deg) translateZ($translateZ);
		animation: rotate1 $speed linear infinite;
	}
	
	.img02 {
		background-image: url("../../../public/2/index.png");
		transform: rotateY(60deg) translateZ($translateZ);
		animation: rotate2 $speed linear infinite;
	}
	
	.img03 {
		background-image: url("../../../public/3/index.png");
		transform: rotateY(120deg) translateZ($translateZ);
		animation: rotate3 $speed linear infinite;
	}
	
	.img04 {
		background-image: url("../../../public/4/index.png");
		transform: rotateY(180deg) translateZ($translateZ);
		animation: rotate4 $speed linear infinite;
	}
	
	.img05 {
		background-image: url("../../../public/5/index.png");
		transform: rotateY(240deg) translateZ($translateZ);
		animation: rotate5 $speed linear infinite;
	}
	
	.img06 {
		background-image: url("../../../public/6/index.png");
		transform: rotateY(300deg) translateZ($translateZ);
		animation: rotate6 $speed linear infinite;
	}
	
	@keyframes rotate1 {
		0% {
			transform: rotateY(0deg) translateZ($translateZ);
			opacity: 1;
		}
		50% {
			transform: rotateY(180deg) translateZ($translateZ);
			opacity: 0.5;
		}
		100% {
			transform: rotateY(360deg) translateZ($translateZ);
			opacity: 1;
		}
	}
	
	@keyframes rotate2 {
		0% {
			transform: rotateY(60deg) translateZ($translateZ);
			opacity: 0.84;
		}
		16.7% {
			transform: rotateY(120deg) translateZ($translateZ);
			opacity: 0.68;
		}
		33.4% {
			transform: rotateY(180deg) translateZ($translateZ);
			opacity: 0.5;
		}
		50.1% {
			transform: rotateY(240deg) translateZ($translateZ);
			opacity: 0.68;
		}
		66.8% {
			transform: rotateY(300deg) translateZ($translateZ);
			opacity: 0.84;
		}
		83.5% {
			transform: rotateY(360deg) translateZ($translateZ);
			opacity: 1;
		}
		100% {
			transform: rotateY(420deg) translateZ($translateZ);
			opacity: 0.84;
		}
	}
	
	@keyframes rotate3 {
		0% {
			transform: rotateY(120deg) translateZ($translateZ);
			opacity: 0.68;
		}
		16.7% {
			transform: rotateY(180deg) translateZ($translateZ);
			opacity: 0.5;
		}
		33.4% {
			transform: rotateY(240deg) translateZ($translateZ);
			opacity: 0.68;
		}
		50.1% {
			transform: rotateY(300deg) translateZ($translateZ);
			opacity: 0.84;
		}
		66.8% {
			transform: rotateY(360deg) translateZ($translateZ);
			opacity: 1;
		}
		83.5% {
			transform: rotateY(420deg) translateZ($translateZ);
			opacity: 0.84;
		}
		100% {
			transform: rotateY(480deg) translateZ($translateZ);
			opacity: 0.68;
		}
	}
	
	@keyframes rotate4 {
		0% {
			transform: rotateY(180deg) translateZ($translateZ);
			opacity: 0.5;
		}
		50% {
			transform: rotateY(360deg) translateZ($translateZ);
			opacity: 1;
		}
		100% {
			transform: rotateY(540deg) translateZ($translateZ);
			opacity: 0.5;
		}
	}
	
	@keyframes rotate5 {
		0% {
			transform: rotateY(240deg) translateZ($translateZ);
			opacity: 0.68;
		}
		16.7% {
			transform: rotateY(300deg) translateZ($translateZ);
			opacity: 0.84;
		}
		33.4% {
			transform: rotateY(360deg) translateZ($translateZ);
			opacity: 1;
		}
		50.1% {
			transform: rotateY(420deg) translateZ($translateZ);
			opacity: 0.84;
		}
		66.8% {
			transform: rotateY(480deg) translateZ($translateZ);
			opacity: 0.68;
		}
		83.5% {
			transform: rotateY(540deg) translateZ($translateZ);
			opacity: 0.5;
		}
		100% {
			transform: rotateY(600deg) translateZ($translateZ);
			opacity: 0.68;
		}
	}
	
	@keyframes rotate6 {
		0% {
			transform: rotateY(300deg) translateZ($translateZ);
			opacity: 0.84;
		}
		16.7% {
			transform: rotateY(360deg) translateZ($translateZ);
			opacity: 1;
		}
		33.4% {
			transform: rotateY(420deg) translateZ($translateZ);
			opacity: 0.84;
		}
		50.1% {
			transform: rotateY(480deg) translateZ($translateZ);
			opacity: 0.68;
		}
		66.8% {
			transform: rotateY(540deg) translateZ($translateZ);
			opacity: 0.5;
		}
		83.5% {
			transform: rotateY(600deg) translateZ($translateZ);
			opacity: 0.68;
		}
		100% {
			transform: rotateY(660deg) translateZ($translateZ);
			opacity: 0.84;
		}
	}
</style>