<!--
 * @Author: Porco
 * @Date: 2019-11-20 13:49:02
 * @LastEditTime: 2019-12-12 22:39:42
 * @Description: 请填写文件注释
 -->
<template>
  <div class="picture">
    <video v-if="playVideo"
    autoplay
    class="video"
    loop="loop" @click="clickVideo">
    <source src="test.mp4" type="video/mp4" />
      您的浏览器不支持 video 标签。
    </video>
    <div v-show="!playVideo" class="layout" :style="style">
      <!-- <div v-for="(item, i) of pictures" :key="i" class="item" @click="click(item)">
        <img class="img" :src="item.src" :style="item.style"/>
      </div> -->
      <!-- <draggable v-show="hasDrag" 
        v-bind="dragOptions" 
        class="line list-group" 
        tag="ul"
        v-model="pictures" group="people" @start="drag=true" @end="drag=false">
        <v-item v-for="(item, i) of pictures" :key="i" 
          :img="item" :width="width" :height="height" 
          :checkedIds="checkedIds" :style="item.gridStyle" @click="click"/>
      </draggable>
      <div v-show="!hasDrag" class="line">
        <v-item v-for="(item, i) of pictures" :key="i" 
          :img="item" :width="width" :height="height" 
          :checkedIds="checkedIds" :style="item.gridStyle" @click="click"/>
      </div> -->

      <draggable
        v-bind="dragOptions" 
        class="line list-group" 
        tag="ul"
        v-model="pictures" 
        group="people"
        :move="dragMove"
        @change="dragEnd"
        @start="drag=true" 
        @end="drag=false">
        <v-item v-for="(item, i) of pictures" 
          :key="i" 
          :img="item" 
          :width="width" 
          :height="height" 
          :checkedIds="checkedIds" 
          :style="item.gridStyle" 
          :drag="drag"
          :timestamp="timestamp"
          @click="click"/>
      </draggable>
    </div>
  </div>
</template>
<script>
  import draggable from 'vuedraggable';
  import _ from 'lodash';
  import vItem from './Item3';
  // import config from '../../../../public/config';
  // const users = config;
  export default {
    components: {
      vItem,
      draggable,
    },
    data() {
      return {
        playVideo: true,
        drag: false,
        hasDrag: true,
        pictures: [], 
        array: [],
        sum: 0,
        width: 14,
        height: 7,
        checkedIds: [],
        timer: null,
        operationDate: 0,
        style: '',
        timestamp: new Date().getTime(),
      }
    },
    mounted() {
      this.initData();
      this.$msg.$on('message-iat' , (res) => {
        this.operationDate = new Date().getTime();
        this.iatStart(res);
      });
      // this.timer = setInterval(() => {
      //   if (new Date().getTime() > this.operationDate + maxLength) {
      //     this.playVideo = true;
      //   }
      // }, 1000);
    },
    destroyed() {
      clearInterval(this.timer);
    },
    computed: {
      dragOptions() {
        return {
          animation: 0,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        };
      }
    },
    watch: {
      pictures: function(v) {
        for (let i = 0; i < v.length; i++) {
          if (i > 90) {
            v[i].id = i + 1;
          } else {
            v[i].id = i;
          }
        }
      },
      checkedIds(v) {
        this.operationDate = new Date().getTime();
      },
      drag(v) {
        this.operationDate = new Date().getTime();
      },
      operationDate(v) {
        this.playVideo = false;
      },
    },
    methods: {
      initData() {
        let i = 0;
        const array = [];
        while (i < 98) {
          const pic = {
            id: i,
            style: '',
            type: 1,
            center: i,
            click: true,
            status: 0, // 0 正常，1放大，2缩小
            ...users[i],
          };
          if (i === 90) {
            ++i;
            pic.gridStyle = 'grid-column: 7 / span 2;grid-row: 7;';
            pic.smallSrc = './picture/audio.png';
            pic.click = false;
          }
          ++i;
          this.pictures.push(pic);
        }
      },
      dragMove(v) {
        const next = v.relatedContext.element;
        const old = v.draggedContext.element;
        const oldIndex = this.checkedIds.indexOf(old.id);
        const nextIndex = this.checkedIds.indexOf(next.id);
        this.checkedIds = [next.id];
      },
      dragEnd() {
        this.timestamp = new Date().getTime();
      },
      click(img) {
        this.operationDate = new Date().getTime();
        const target = this.getTarget(img);
        const resImg = this.swap(img, target);
        this.changeIds(target);
      },
      getTarget(source) {
        const valid = [
          29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
          43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
          57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,
        ];
        if (valid.indexOf(source.id) > -1) return source;
        let min = 100, target = null;
        for (const v of valid) {
          const res = this.distance(source.id, v);
          if (res < min) {
            min = res;
            target = this.pictures[v];
          }
        }
        const array = [];
        for (const v of this.checkedIds) {
          const res = this.distance(target.id, v);
          if (res >= 2) {
            array.push(v);
          }
        }
        this.checkedIds = array;
        return target;
      },
      distance(point1, point2) {
        const p1x = point1 % this.width;
        const p1y = Math.floor(point1 / this.width);
        const p2x = point2 % this.width;
        const p2y = Math.floor(point2 / this.width);
        return Math.sqrt(Math.pow(p1x - p2x, 2) + Math.pow(p1y - p2y, 2));
      },
      // 交换位置
      swap(a, b) {
        const array = _.cloneDeep(this.pictures);
        const index = a.id > 90 ? a.id - 1 : a.id;
        let temp = array[index];
        temp.id = b.id;
        
        array[index] = array[b.id];
        array[index].id = a.id;
        array[b.id] = temp;
        this.pictures = array;
      },
      changeIds(img) {
        const index = this.checkedIds.indexOf(img.id);
        if (index > -1) {
          this.checkedIds.splice(index, 1);
        } else {
          this.checkedIds.push(img.id);
        }
        if (this.checkedIds.length > 0) {
          this.hasDrag = false;
        } else {
          this.hasDrag = true;
        }
      },
      iatStart(str) {
        if (!str || str.length === 0) return;
        for (const v of this.pictures) {
          if (v.name.indexOf(str) >  -1 || str.indexOf(v.name) > -1 || (v.tags && v.tags.indexOf(str)) > -1) {
            this.click(v);
            break;
          }
        }
      },
      clickVideo() {
        this.operationDate = new Date().getTime();
      },
    }
  }
</script>
<style lang="scss" scoped>
@keyframes layout {
  0% {
    transform: scale(0) rotate(0);
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
}
html {
  height: 100%;
  width: 100%;
}
body {
  height: 100%;
  width: 100%;
}
video {
  height: 100%;
  width: 100%;
}
.picture {
  height: 100%;
  width: 100%;
  background-color: #000;
  .video {
    height: 100%;
    width: 100%;
  }
  .layout {
    height: 100%;
    background-color: #000;
    animation: layout 1s forwards;
    .line {
      overflow: hidden;
      height: 100%;
      background-color: #000;
      display: grid;
      grid-template-columns: repeat(14, 7.143%);
      grid-template-rows: repeat(7, 14.3%);
    }
  } 
}
</style>