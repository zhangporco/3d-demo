<template>
  <div class="iat">
    <div
      class="btn"
        @mousedown="mousedown" 
        @touchstart="mousedown"
        @mouseup="mouseup"
        @touchend="mouseup">{{title}}</div>
    <p class="main" v-for="(v, i) of texts" :key="i" >{{v}}</p>
  </div>
</template>
<script>
import IatTaste from '../picture/v3/audio/index';
export default {
  data() {
    return {
      title : '按住开始录音',
      texts: [],
    }
  },
  mounted() {
    document.oncontextmenu = function (event) {
      event.preventDefault();
    };
    this.$msg.$on('message-iat' , (res) => {
      console.log(res);
      if (this.texts && this.texts.length >= 30) {
        this.texts.splice(0, 1);
      }
      if (this.texts.indexOf(res) === -1) {
        this.texts.push(res);
      }
    });
  },
  methods: {
    mousedown() {
      new IatTaste().start();
      this.title = '录音中…………';
    },
    mouseup() {
      new IatTaste().stop();
      this.title = '按住开始录音';
    },
  },
}
</script>
<style lang="scss" scoped>
  .iat {
    height: 100%;
  }
  .btn {
    width: 200px;
    height: 50px;
    background-color: #555;
    color: #fff;
    line-height: 50px;
    text-align: center;
    border-radius: 10px;
  }
</style>