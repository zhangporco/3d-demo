<!--
 * @Author: Porco
 * @Date: 2019-11-20 13:49:02
 * @LastEditTime: 2019-11-25 15:00:21
 * @Description: 请填写文件注释
 -->
<template>
  <div class="picture">
    <div class="layout">
      <div v-for="(item, i) of pictures" :key="i" class="item" @click="click(item)">
        <img class="img" :src="item.src" :style="item.style"/>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        pictures: [], 
        sum: 0,
      }
    },
    mounted() {
      this.initData();
    },
    methods: {
      initData() {
        const picture = {
          src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573536028027&di=606d35cd42cd127c9947528690d13120&imgtype=0&src=http%3A%2F%2Fwww.pkusky.com%2Fupfile%2Fimages%2Friyudujie0112.jpg',
        }
        for (let i = 0; i < 48; i++) {
          this.pictures.push({
            id: i,
            style: '',
            type: 1,
            center: i,
            ...picture,
          });
        }
      },
      click(img) {
        this.sum++;
        if (img.isClick) {
          img.style = `transform: scale(1);z-index: 1;`;
          img.isClick = false;
          this.small(img);
        } else {
          img.style = `position: absolute;transform: scale(1.5);z-index: ${this.sum};`;
          img.isClick = true;
          this.big(img);
        }
      },
      big(img) {
        this.tl(img.id);
        this.tc(img.id);
        this.tr(img.id);
        this.cl(img.id);
        this.cr(img.id);
        this.bl(img.id);
        this.bc(img.id);
        this.br(img.id);
      },
      small(img) {
        const array = this.getChangeList(img.id);
        for (const v of this.pictures) {
          if (array.indexOf(v.id) > -1) {
            v.style = `transform: scale(1);z-index: 1;`;
            v.type = 1;
          }
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
      },
      tl(i) {
        const index = i - 13 < 0 ? -1 : i - 13;
        if (index > -1) {
          this.pictures[index].style = 'position: absolute;transform: scale(1, 0.5);transform-origin: top center;z-index: 1;';
        }
      },
      tc(i) {
        const index = i - 12 < 0 ? -1 : i - 12;
        if (index > -1) {
          this.pictures[index].style = 'position: absolute;transform: scale(1, 0.5);transform-origin: top center;z-index: 1;';
        }
      },
      tr(i) {
        const index = i - 11 < 0 ? -1 : i - 11;
        if (index > -1) {
          this.pictures[index].style = 'position: absolute;transform: scale(1, 0.5);transform-origin: top center;z-index: 1;';
        }
      },
      cl(i) {
        const index = i % 12 > 0 ? i - 1 : -1;
        if (index > -1) {
          this.pictures[index].style = 'position: absolute;transform: scale(0.5, 2);transform-origin: center left;z-index: 1;';
        }
      },
      cr(i) {
        const index = i % 11 > 0 ? i + 1 : -1;
        if (index > -1) {
          this.pictures[index].style = 'position: absolute;transform: scale(0.5, 2);transform-origin: center right;z-index: 1;';
        }
      },
      bl(i) {
        const index = i + 11 < 49 ? i + 11 : -1;
        if (index > -1) {
          this.pictures[index].style = 'position: absolute;transform: scale(1, 0.5);transform-origin: bottom left;z-index: 1;';
        }
      },
      bc(i) {
        const index = i + 12 < 49 ? i + 12 : -1;
        if (index > -1) {
          this.pictures[index].style = 'position: absolute;transform: scale(1, 0.5);transform-origin: bottom left;z-index: 1;';
        }
      },
      br(i) {
        const index = i + 13 < 49 ? i + 13 : -1;
        if (index > -1) {
          this.pictures[index].style = 'position: absolute;transform: scale(1, 0.5);transform-origin: bottom left;z-index: 1;';
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
.picture {
  height: 100%;
  width: 100%;
  .layout {
    display: grid;
    grid-template-columns: repeat(12, 320px);
    grid-template-rows: repeat(4, 540px);
    .item {
      position: relative;
      background-color: #000000;
      height: 100%;
      width: 100%;
      .img {
        height: 100%;
        width: 100%;
      }
    }
  } 
}
</style>