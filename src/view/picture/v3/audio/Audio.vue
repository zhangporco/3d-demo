<!--
 * @Author: Porco
 * @Date: 2019-12-06 11:08:34
 * @LastEditTime: 2019-12-08 12:52:15
 * @Description: 请填写文件注释
 -->

<template>
  <div>
    <el-button @click="start">start</el-button>
    <el-button @click="stop">stop</el-button>
  </div>
</template>
<script>
import IatTaste from './index';
export default {
  data() {
    return {
      appId: '5b304385',
      apiKey: 'fb54114cf9f258310a22dc6e99ee3d5c',
      apiSecret: '10659c59da80c7a528762a8b3cd3ee1f',
    };
  },
  mounted() {
    this.$msg.$on('message' , (message) =>{
      console.log(1111, message);
    });
  },
  methods: {
    start () {
      var iatTaste = new IatTaste()
      iatTaste.start()
    },
    stop() {
      var iatTaste = new IatTaste()
      iatTaste.stop();
    }
  },
}
</script>