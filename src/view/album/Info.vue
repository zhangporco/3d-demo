<template>
	<div v-bind:class="status === 0 ? 'info scale1' : 'info scale0'">
		<img class="btn-back" src="../../../public/btn_back.png" @click="back"/>
		<el-carousel v-if="array[type - 1] && array[type - 1].length > 1"
		             ref="carousel"
		             :autoplay="false"
		             arrow="always"
		             :height="bannerHeight + 'px'">
			<el-carousel-item v-for="(url, i) of array[type - 1]" :key="i">
				<!--<img class="img-info" :src="url"/>-->
				<el-image
						class="img-info"
						:src="url"
						></el-image>
			</el-carousel-item>
		</el-carousel>
		<el-image
				v-else
				class="img-info"
				:src="array[type - 1][0]"
		></el-image>
	</div>
</template>

<script>
	export default {
		props: [ 'type', 'timestamp' ],
		data() {
			return {
				status: 0,
				bannerHeight: 0,
				array: [
					[ './1/info_1.png' ],
					[ './2/info_1.png' ],
					[ './3/info_1.png' ],
					[ './4/info_1.png' ],
					[
						'./5/info_1.png',
						'./5/info_2.png',
						'./5/info_3.png',
						'./5/info_4.png',
						'./5/info_5.png',
					],
					[
						'./6/info_1.png',
						'./6/info_2.png',
						'./6/info_3.png',
						'./6/info_4.png',
					],
				],
			}
		},
		mounted () {
			this.setSize();
			const that = this;
			window.addEventListener('resize', function() {
				that.setSize();
			}, false);
		},
		watch: {
			timestamp() {
				this.status = 0;
				this.$refs['carousel'].setActiveItem(0);
			},
		},
		methods: {
			setSize() {
				this.bannerHeight = document.documentElement.clientHeight - 100;
			},
			back() {
				this.status = 1;
				setTimeout(() => {
					this.$emit('back');
				}, 1000);
			},
		},
	}
</script>

<style lang="scss" scoped>
	.info {
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.scale1 {
		animation: scale1 1s;
		animation-fill-mode: forwards;
	}
	.scale0 {
		animation: scale0 1s;
		animation-fill-mode: forwards;
	}
	.btn-back {
		position: absolute;
		right: 30px;
		top: 30px;
		width: 100px;
		cursor: pointer;
		z-index: 9999;
	}
	.img-info {
		width: 100%;
		height: 100%;
	}
	@keyframes scale1 {
		0% {
			transform: scale(0);
			z-index: 0;
		}
		100% {
			transform: scale(1);
			z-index: 100;
		}
	}
	@keyframes scale0 {
		0% {
			transform: scale(1);
			z-index: 100;
		}
		100% {
			transform: scale(0);
			z-index: 0;
		}
	}
	
</style>
<style lang="scss" >
	.el-carousel__arrow {
		width: 60px;
		height: 60px;
		i {
			font-size: 40px;
			font-weight: bolder;
		}
	}
</style>