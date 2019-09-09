<template>
	<div class="my-container">  <!-- 大容器 -->
		<p class="title" v-show="showAlbum">总体规划</p>
		<div id="rotate-container"
		     v-bind:style="{transform: transform}"
		     v-bind:class="showAlbum ? 'container show' : 'container hidden'">   <!-- 相册容器 -->
			<div v-for="(v, i) of images" :key="i"
			     v-bind:class="'img ' + v.class"
			     @click="clickImg(v.index)"
			     :style="{animationPlayState: playState}"></div>
		</div>
		<v-info v-bind:class="!showAlbum ? ' ' : 'info-hidden'"
		        :timestamp="timestamp"
		        :type="type" @back="back"/>
	</div>
</template>

<script>
	import $ from 'jquery';
	import vInfo from './Info';
	
	export default {
		components: {
			vInfo,
		},
		data() {
			return {
				timestamp: new Date().getTime(),
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
				transform: '',
			}
		},
		mounted() {
			this.rotate();
		},
		methods: {
			rotate() {
				let oldX = null;
				let isdown = false;
				$("#rotate-container").mousedown((e) => {
					this.playState = 'paused';
					isdown = true;
					oldX = e.clientX;
				});
				$("html").mousemove((e) => {
					if (isdown) {
						this.transform = `rotateX(0deg) rotateY(${e.clientX - oldX}deg)`;
					}
				});
				$("html").mouseup((e) => {
					this.playState = 'running';
					isdown = false;
					oldX = null;
				});
			},
			clickImg(i) {
				this.type = i;
				this.showAlbum = false;
				this.playState = 'paused';
				this.timestamp = new Date().getTime();
			},
			back() {
				this.showAlbum = true;
				setTimeout(() => {
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
	
	/*.show {*/
		/*animation: opacity0 1s;*/
		/*animation-fill-mode: forwards;*/
	/*}*/
	
	/*.hidden {*/
		/*animation: opacity1 1s;*/
		/*animation-fill-mode: forwards;*/
	/*}*/
	
	.info-hidden {
		display: none;
	}
	
	@keyframes opacity0 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	
	@keyframes opacity1 {
		0% {
			opacity: 1;
			visibility: visible;
		}
		100% {
			opacity: 0;
			visibility: hidden;
		}
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
	}
	
	.img02 {
		background-image: url("../../../public/2/index.png");
		transform: rotateY(60deg) translateZ($translateZ);
	}
	
	.img03 {
		background-image: url("../../../public/3/index.png");
		transform: rotateY(120deg) translateZ($translateZ);
	}
	
	.img04 {
		background-image: url("../../../public/4/index.png");
		transform: rotateY(180deg) translateZ($translateZ);
		
	}
	
	.img05 {
		background-image: url("../../../public/5/index.png");
		transform: rotateY(240deg) translateZ($translateZ);
	}
	
	.img06 {
		background-image: url("../../../public/6/index.png");
		transform: rotateY(300deg) translateZ($translateZ);
	}
</style>