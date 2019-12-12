<!--
 * @Author: Porco
 * @Date: 2019-12-01 22:13:43
 * @LastEditTime: 2019-12-12 12:35:47
 * @Description: 请填写文件注释
 -->
<template>
  <div class="item-pic" >
    <div class="layout">
      <!-- <img  class="img" :src="item.src" @click="click" :style="item.style" /> -->
      <img v-show="status !== 1"
        class="img" 
        :id="item.id" 
        :src="item.src" 
        @click="click" 
        :style="item.style" 
        @mousedown="mousedown" 
        @mouseup="mouseup"/>
      <div v-show="status === 1" class="big-layout" :style="item.style">
        <div class="title ellipsis">{{item.title}}</div>
        <img class="img1" :src="item.src" />
        <div class="name ellipsis">{{item.name}}</div>
        <div class="title2 ellipsis">{{item.title2}}</div>
        <div class="title3">{{item.title3}}</div>
        <div class="context" v-html="item.context"></div>
        <div class="btn t1" @click="play"></div>
        <div class="btn t2" @click="click"></div>
      </div>
    </div>
  </div>
</template>
<script>
// import Recorder from 'js-audio-recorder';
import _ from 'lodash';
// import startIat from './audio/iat-ws-node';
import IatTaste from './audio/index';
import { throttle } from '../../../util/function';

// let recorder = new Recorder();

export default {
  props: [ 'img', 'width', 'height', 'checkedIds' ],
  data() {
    return {
      status: 0, // 0 正常，1放大，2缩小
      once: 1,
      item: this.img,
      src: this.img.src,
      x: 'center',
      y: 'center',
      scale: 1,
      iat: null,
    }
  },
  watch: {
    img(v) {
      this.item = v;
    },
    checkedIds(v) {
      let min = 10;
      for (const id of this.checkedIds) {
        const distance = this.matrixDistance(this.item.id, id);
        min = distance < min ? distance : min;
      }
      if (min === 0) {
        this.status = 1;
      } else if (min < 3) {
        this.status = 2;
      } else {
        if (this.status === 0) {
          this.item.style = `position: absolute;transform: scale(1);z-index:10;`;
        } else {
          this.status = 0;
        } 
      }
    },
    status(v, old) {
      const animation = `status${old}${v}`;
      switch(v) {
        case 2:
          return this.status2(animation);
        default:
          return this.status1(animation);
      }
    },
  },
  mounted() {
    this.iat = new IatTaste();
  },
  methods: {
    click() {
      if (this.status === 2) return;
      if (this.item.click) {
        this.$emit('click', this.item);
      }
    },
    mousedown() {
      if (!this.item.click) {
        this.iat.start();
        this.item.src = './picture/audio-start.png';
      }
    },
    mouseup() {
      if (!this.item.click) {
        this.iat.stop();
        this.item.src = this.src;
      }
    },
    matrixDistance(point1, point2) {
      const p1x = point1 % this.width;
      const p1y = Math.floor(point1 / this.width);
      const p2x = point2 % this.width;
      const p2y = Math.floor(point2 / this.width);
      // if (p1x < p2x) {
      //   this.x = 'left';
      // } else if (p1x > p2x) {
      //   this.x = 'right';
      // } else {
      //   this.x = 'center';
      // }
      // if (p1y < p2y) {
      //   this.y = 'top';
      // } else if (p1y > p2y) {
      //   this.y = 'bottom';
      // } else {
      //   this.y = 'center';
      // }
      this.x = Math.random() * 100 + '%';
      this.y = Math.random() * 100 + '%';
      if (p1x !== p2x && p1y !== p2y) {
        this.scale = 0.5;
      } else {
        this.scale = 0.5;
      }
      return Math.sqrt(Math.pow(p1x - p2x, 2) + Math.pow(p1y - p2y, 2));
    },
    status1(animation) {
      this.item.style = `position: absolute;animation: ${animation} 1s forwards`;
    },
    status2(animation) {
      this.item.style = `position: absolute;transform-origin: ${this.x} ${this.y};animation: ${animation} 1s forwards`;
    },
    play() {
      console.log('play');
    },
  }
}
</script>
<style lang="scss">
@keyframes status01 {
  0% {
    transform: scale(1);
    z-index: 10;
  }
  100% {
    transform: scale(3);
    opacity: 1;
    z-index: 100;
  }
}
@keyframes status10 {
  0% {
    transform: scale(3);
    z-index: 100;
  }
  100% {
    transform: scale(1);
    opacity: 1;
    z-index: 10;
  }
}
@keyframes status02 {
  0% {
    transform: scale(1);
    opacity: 1;
    z-index: 10;
  }
  100% {
    transform: scale(0.5);
     opacity: 0.5;
    z-index: 1;
  }
}
@keyframes status20 {
  0% {
    transform: scale(0.5);
    opacity: 0.5;
    z-index: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
    z-index: 9;
  }
}
@keyframes status21 {
  0% {
    transform: scale(0.5);
    opacity: 0.5;
    z-index: 1;
  }
  100% {
    transform: scale(3);
    opacity: 1;
    z-index: 100;
  }
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-pic {
  height: 100%;
  width: 100%;
  background-color: #000;
  border: none;
  .layout {
    height: 100%;
    width: 100%;
    position: relative;
    background-color: #000000;
    .img {
      height: 90%;
      width: 90%;
      margin: 5% 5%;
    }
    .big-layout {
      width: 100%;
      height: 135%;
      background-image: url("../../../../public/picture/base.jpeg");
      background-repeat: no-repeat;
      background-position: 0 center;
      background-size: 100% 100%;
      .title {
        position: absolute;
        left: 34%;
        top: 1%;
        /* max-width: 170px; */
        color: #3a8599;
        font-size: 12px;
        /* transform: scale(0.3);*/
      }
      .img1 {
        height: 54%;
        width: 75%;
        position: absolute;
        top: 7%;
        left: 14%;
      }
      .name {
        position: absolute;
        left: 16%;
        top: 63%;
        /* max-width: 170px; */
        color: #fff;
        font-size: 17px;
        /* transform: scale(0.5); */
      }
      .title2 {
        position: absolute;
        left: 52%;
        top: 64%;
        max-width: 170px;
        color: #fff;
        font-size: 12px;
        /* transform: scale(0.2); */
      }
      .title3 {
        position: absolute;
        left: 10%;
        top: 68%;
        max-width: 170px;
        color: #fff;
        font-size: 12px;
        transform: scale(0.8);
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .context {
        position: relative;
        color: #3a8599;
        font-size: 12px;
        /* transform: scale(0.2); */
        height: 18%;
        width: 80%;
        top: 73%;
        left: 12%;
        overflow-y: auto;
      }
      .btn {
        position: absolute;
        // border: 1px solid #fff;
        width: 13%;
        height: 5%;
      }
      .t1 {
        left: 36%;
        top: 94%;
      }
      .t2 {
        left: 51%;
        top: 94%;
      }
    }
  }
}

</style>