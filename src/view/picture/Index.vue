<!--
 * @Author: Porco
 * @Date: 2019-11-12 10:19:12
 * @LastEditTime: 2019-12-09 10:46:34
 * @Description: 请填写文件注释
 -->
<template>
  <div class="picture-layout">
    <draggable class="line" v-model="array" group="people" @start="drag=true" @end="drag=false">
      <div v-for="(item, i) of array" :key="i" class="item">
        <div @click="clickImg(item, i)" v-bind:class="imgIds.indexOf(i) > -1 ? 'frame-checked' : smallList.indexOf(i) > -1 ? 'frame-small' : 'frame' " >
          <img :src="item.src" 
            v-bind:class="imgIds.indexOf(i) > -1 ? 'img-checked' : smallList.indexOf(i) > -1 ? 'img-small' : 'img'"/>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import { encodeGBK, decodeGBK } from 'gbk-string';
import draggable from 'vuedraggable';
  export default {
    components: {
      draggable,
    },
    data() {
      return {
        pictures: [
          {
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573536028027&di=606d35cd42cd127c9947528690d13120&imgtype=0&src=http%3A%2F%2Fwww.pkusky.com%2Fupfile%2Fimages%2Friyudujie0112.jpg',
          },
          {
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573560421133&di=dacf5789cbd0df824b560d5f5a71f16a&imgtype=0&src=http%3A%2F%2Fpic29.nipic.com%2F20130527%2F9331768_163938364000_2.jpg',
          },
          {
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573560507147&di=60260b70fee528baea6d9d73d74a7a4c&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201310%2F16%2F224046ups8zp1jg31uz82g.jpg',
          },
          {
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573560565902&di=813391cf4f5e0faf73edff23bc82b631&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201403%2F21%2F20140321015507_dZXuc.jpeg',
          },
          {
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573560579889&di=8b26725bb54cbac2aa74dba1e5d1b356&imgtype=0&src=http%3A%2F%2Fpic31.nipic.com%2F20130715%2F3792_223513575104_2.jpg',
          },
          {
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573560594487&di=d1f2ea523a6ee08a26c641a96db2859e&imgtype=0&src=http%3A%2F%2Fimg8.zol.com.cn%2Fbbs%2Fupload%2F22831%2F22830771.JPG',
          },
          {
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573560634314&di=82d33e7b247a3b21d19a38d9b31f021b&imgtype=0&src=http%3A%2F%2Fpic30.nipic.com%2F20130626%2F12257726_085227197000_2.jpg',
          },
          {
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573560781017&di=e66e49c91ccc42a4f7a6dc3644864a9e&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201409%2F07%2F20140907225622_kuBA5.jpeg',
          },
          {
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574155369&di=15cf37efacf65dbd077284b3b2b0aa74&imgtype=jpg&er=1&src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201610%2F27%2F222600b53dppk2tqc5d332.jpg',
          },
          {
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573560672247&di=ddd32cdf3274e12121e5f4d95f2fee6d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F037094356e1859e32f875520f774466.jpg',
          },
          {
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573560760107&di=3ca5fe6ff77fcb415784f50ecfec380d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201402%2F25%2F20140225114845_WA58Q.jpeg',
          },
          {
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573560832838&di=34a97903054e0dd368da093426a8ebd0&imgtype=0&src=http%3A%2F%2Fpic41.nipic.com%2F20140511%2F14735567_151148410141_2.jpg',
          },
        ],
        array: [],
        imgIds: [],
        drag: true,
        smallList: [],
        isBig: false,
      }
    },
    mounted() {
      this.makeData();
    },
    methods: {
      makeData() {
        const pictures = [ ...this.pictures, ...this.pictures, ...this.pictures, ...this.pictures ];
        let index = 0;
        let line = [];
        const array = [];
        for (const [ i, v ] of pictures.entries()) {
          const obj = {
            id: i,
            src: v.src,
          }
          array.push(obj);
        }
        this.array = array;
      },
      clickImg(img, i) {
        const index = this.imgIds.indexOf(i);
        const smallList = this.getChangeList(i);
        if (index > -1) {
          this.imgIds.splice(index, 1);
          this.smallList = [];
        } else {
          this.imgIds.push(i);
          this.smallList = [ ...smallList, ...this.smallList ];
        }
      },
      getChangeList(i) {
        let tl = i - 13 < 0 ? -1 : i - 13;
        let tc = i - 12 < 0 ? -1 : i - 12;
        let tr = i - 11 < 0 ? -1 : i - 11;
        let cl = i % 12 > 0 ? i - 1 : -1;
        let cr = i % 11 > 0 ? i + 1 : -1;
        let bl = i + 11 < 49 ? i + 11 : -1;
        let bc = i + 12 < 49 ? i + 12 : -1;
        let br = i + 13 < 49 ? i + 13 : -1;
        return [ tl, tc, tr, cl, cr, bl, bc, br ];
      }
    }
  }
</script>

<style lang="scss" scoped>
.picture-layout {
  height: 100%;
  width: 100%;
  .line {
    height: 25%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .item {
      display: inline-block;
      position: relative;
      background-color: #000000;
      width: 320px;
      height: 100%;
      .frame {
        height: 100%;
        width: 100%;
        .img {
          height: 100%;
          width: 100%;
        }
      }
      .frame-checked {
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 1;
        transform: scale(1.5);
        // border-radius: 50%;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        .img-checked {
          height: 100%;
          width: 100%;
          margin: auto;
        }
      }
      .frame-small {
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 0;
        transform: scale(0.8);
        // border-radius: 50%;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        .img-small {
          height: 100%;
          width: 100%;
          margin: auto;
        }
      }
    }
  }
}
</style>