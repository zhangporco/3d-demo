<template>
	<div class="my-container">  <!-- 大容器 -->
		<p class="title" v-show="showAlbum">总体规划</p>
		<div v-bind:class="showAlbum ? 'container show' : 'container hidden'">
			<div id="rotate-container"
			     :style="{transform: transform,animationPlayState: playState}"
			     class="container">   <!-- 相册容器 -->
				<div v-for="(v, i) of images" :key="i"
				     v-bind:class="'img ' + v.class"
				     @click="clickImg(v.index)"></div>
			</div>
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
				
				const container = document.getElementById("rotate-container");
				container.addEventListener('touchstart', (e) => {
					this.playState = 'paused';
					isdown = true;
					const touch = e.targetTouches[0];
					oldX = touch.clientX;
				}, false);
				container.addEventListener('touchmove', (e) => {
					const touch = e.targetTouches[0];
					if (isdown) {
						this.transform = `rotateX(0deg) rotateY(${touch.clientX - oldX}deg)`;
					}
				}, false);
				container.addEventListener('touchend', (e) => {
					this.playState = 'running';
					isdown = false;
					oldX = null;
				}, false);
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
		overflow: hidden;
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
	
	.show {
		animation: opacity0 1s;
		animation-fill-mode: forwards;
	}
	
	.hidden {
		animation: opacity1 1s;
		animation-fill-mode: forwards;
	}
	
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
		/*width: 30%;*/
		/*height: 30%;*/
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
			opacity: 0.8;
		}
		100% {
			transform: rotateY(360deg) translateZ($translateZ);
			opacity: 1;
		}
	}
	
	@keyframes rotate2 {
		0% {
			transform: rotateY(60deg) translateZ($translateZ);
			opacity: 0.94;
		}
		16.7% {
			transform: rotateY(120deg) translateZ($translateZ);
			opacity: 0.9;
		}
		33.4% {
			transform: rotateY(180deg) translateZ($translateZ);
			opacity: 0.8;
		}
		50.1% {
			transform: rotateY(240deg) translateZ($translateZ);
			opacity: 0.9;
		}
		66.8% {
			transform: rotateY(300deg) translateZ($translateZ);
			opacity: 0.94;
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
			opacity: 0.9;
		}
		16.7% {
			transform: rotateY(180deg) translateZ($translateZ);
			opacity: 0.8;
		}
		33.4% {
			transform: rotateY(240deg) translateZ($translateZ);
			opacity: 0.9;
		}
		50.1% {
			transform: rotateY(300deg) translateZ($translateZ);
			opacity: 0.94;
		}
		66.8% {
			transform: rotateY(360deg) translateZ($translateZ);
			opacity: 1;
		}
		83.5% {
			transform: rotateY(420deg) translateZ($translateZ);
			opacity: 0.94;
		}
		100% {
			transform: rotateY(480deg) translateZ($translateZ);
			opacity: 0.9;
		}
	}
	
	@keyframes rotate4 {
		0% {
			transform: rotateY(180deg) translateZ($translateZ);
			opacity: 0.8;
		}
		50% {
			transform: rotateY(360deg) translateZ($translateZ);
			opacity: 1;
		}
		100% {
			transform: rotateY(540deg) translateZ($translateZ);
			opacity: 0.8;
		}
	}
	
	@keyframes rotate5 {
		0% {
			transform: rotateY(240deg) translateZ($translateZ);
			opacity: 0.8;
		}
		16.7% {
			transform: rotateY(300deg) translateZ($translateZ);
			opacity: 0.94;
		}
		33.4% {
			transform: rotateY(360deg) translateZ($translateZ);
			opacity: 1;
		}
		50.1% {
			transform: rotateY(420deg) translateZ($translateZ);
			opacity: 0.94;
		}
		66.8% {
			transform: rotateY(480deg) translateZ($translateZ);
			opacity: 0.8;
		}
		83.5% {
			transform: rotateY(540deg) translateZ($translateZ);
			opacity: 0.8;
		}
		100% {
			transform: rotateY(600deg) translateZ($translateZ);
			opacity: 0.8;
		}
	}
	
	@keyframes rotate6 {
		0% {
			transform: rotateY(300deg) translateZ($translateZ);
			opacity: 0.94;
		}
		16.7% {
			transform: rotateY(360deg) translateZ($translateZ);
			opacity: 1;
		}
		33.4% {
			transform: rotateY(420deg) translateZ($translateZ);
			opacity: 0.94;
		}
		50.1% {
			transform: rotateY(480deg) translateZ($translateZ);
			opacity: 0.8;
		}
		66.8% {
			transform: rotateY(540deg) translateZ($translateZ);
			opacity: 0.8;
		}
		83.5% {
			transform: rotateY(600deg) translateZ($translateZ);
			opacity: 0.9;
		}
		100% {
			transform: rotateY(660deg) translateZ($translateZ);
			opacity: 0.94;
		}
	}
</style>