<template>
	<div class="my-container">  <!-- 大容器 -->
		<p class="title" v-show="showAlbum">总体规划</p>
		<div class="container" v-show="showAlbum"
		     id="album"
		     :style="{animationPlayState: playState,transform: transform}">   <!-- 相册容器 -->
			<div v-for="(v, i) of images" :key="i"
			     :id="i + 1"
			     v-bind:class="'img ' + v.class"
			     @click="clickImg(v.index)"
			     :style="{opacity: v.opacity}"
			     ></div>
		</div>
		<v-info v-show="!showAlbum"
		        :timestamp="timestamp"
		        :type="type" @back="back"/>
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
				timestamp: new Date().getTime(),
				playState: 'running',
				transform: '',
				type: 0,
				showAlbum: true,
				images: [
					{
						class: 'img01',
						index: 1,
						opacity: 1,
					},
					{
						class: 'img02',
						index: 2,
						opacity: 0.8,
					},
					{
						class: 'img03',
						index: 3,
						opacity: 0.6,
					},
					{
						class: 'img04',
						index: 4,
						opacity: 0.4,
					},
					{
						class: 'img05',
						index: 5,
						opacity: 0.6,
					},
					{
						class: 'img06',
						index: 6,
						opacity: 0.8,
					},
				],
				timer: null,
				timer2: null,
				runState: true,
				speed: 0.01,
				rotateY: 0,
				clickIndex: 0,
			}
		},
		watch: {
			runState(v) {
				this.playState = v ? 'running' : 'paused';
			},
		},
		mounted() {
			this.timer = setInterval(() => {
				if (this.runState) {
					this.rotateY += this.speed;
					this.transform = `rotateX(0deg) rotateY(${this.rotateY}deg)`;
					if (this.rotateY > 360) {
						this.rotateY = 0;
					}
					if (this.speed > 0.1) {
						if (this.rotateY >= 360 - (this.clickIndex - 1) * 60 - 2 && this.rotateY < (360 - (this.clickIndex - 1) * 60) + 2) {
							this.runState = false;
							setTimeout(() => {
								this.type = this.clickIndex;
								this.showAlbum = false;
								this.timestamp = new Date().getTime();
							}, 1000);
						}
					}
				}
			}, 1);
			this.timer2 = setInterval(() => {
				if (this.rotateY >= 30 && this.rotateY < 90) {
					this.images[0].opacity = 0.8;
					this.images[1].opacity = 0.6;
					this.images[2].opacity = 0.4;
					this.images[3].opacity = 0.6;
					this.images[4].opacity = 0.8;
					this.images[5].opacity = 1;
				} else if (this.rotateY >= 90 && this.rotateY < 150) {
					this.images[0].opacity = 0.6;
					this.images[1].opacity = 0.4;
					this.images[2].opacity = 0.6;
					this.images[3].opacity = 0.8;
					this.images[4].opacity = 1;
					this.images[5].opacity = 0.8;
				} else if (this.rotateY >= 150 && this.rotateY < 210) {
					this.images[0].opacity = 0.4;
					this.images[1].opacity = 0.6;
					this.images[2].opacity = 0.8;
					this.images[3].opacity = 1;
					this.images[4].opacity = 0.8;
					this.images[5].opacity = 0.6;
				} else if (this.rotateY >= 210 && this.rotateY < 270) {
					this.images[0].opacity = 0.6;
					this.images[1].opacity = 0.8;
					this.images[2].opacity = 1;
					this.images[3].opacity = 0.8;
					this.images[4].opacity = 0.6;
					this.images[5].opacity = 0.4;
				} else if (this.rotateY >= 270 && this.rotateY < 330) {
					this.images[0].opacity = 0.8;
					this.images[1].opacity = 1;
					this.images[2].opacity = 0.8;
					this.images[3].opacity = 0.6;
					this.images[4].opacity = 0.4;
					this.images[5].opacity = 0.6;
				} else if (this.rotateY >= 330 || this.rotateY < 30) {
					this.images[0].opacity = 1;
					this.images[1].opacity = 0.8;
					this.images[2].opacity = 0.6;
					this.images[3].opacity = 0.4;
					this.images[4].opacity = 0.6;
					this.images[5].opacity = 0.8;
				}
			}, 10);
		},
		destroyed() {
			clearInterval(this.timer);
			clearInterval(this.timer2);
		},
		methods: {
			clickImg(i) {
				this.runState = true;
				this.clickIndex = i;
				this.speed = 4;
			},
			back() {
				this.runState = true;
				this.showAlbum = true;
				this.speed = 0.01;
				this.playState = 'running';
			},
		}
	}
</script>

<style lang="scss" scoped>
	$speed: 40s;
	$translateZ: 600px;
	
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
		transform: rotateX(0deg) rotateY(0deg);
		/*animation: go 45s linear infinite;*/
		/*animation: scale1 1s;*/
		/*animation-fill-mode: forwards;*/
	}
	.container:hover {
		animation-play-state: paused;
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
	
	@keyframes go {
		0%{transform: rotateX(0deg) rotateY(0deg);}
		50%{transform: rotateX(0deg) rotateY(360deg);}
		100%{transform: rotateX(0deg) rotateY(720deg);}
	}
	@keyframes scale1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
</style>