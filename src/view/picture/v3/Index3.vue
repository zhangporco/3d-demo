<!--
 * @Author: Porco
 * @Date: 2019-11-20 13:49:02
 * @LastEditTime: 2019-12-12 19:08:37
 * @Description: 请填写文件注释
 -->
<template>
  <div class="picture">
    <div class="layout">
      <!-- <div v-for="(item, i) of pictures" :key="i" class="item" @click="click(item)">
        <img class="img" :src="item.src" :style="item.style"/>
      </div> -->
      <draggable v-show="hasDrag" 
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
      </div>
    </div>
  </div>
</template>
<script>
  import draggable from 'vuedraggable';
  import _ from 'lodash';
  import vItem from './Item';
  export default {
    components: {
      vItem,
      draggable,
    },
    data() {
      return {
        drag: true,
        hasDrag: true,
        pictures: [], 
        array: [],
        sum: 0,
        width: 14,
        height: 7,
        checkedIds: [],
      }
    },
    created() {
      this.initData();
      this.$msg.$on('message-iat' , (res) => {
        console.log(res);
        this.iatStart(res);
      });
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
        // console.log(v);
        for (let i = 0; i < v.length; i++) {
          if (i > 90) {
            v[i].id = i + 1;
          } else {
            v[i].id = i;
          }
        }
      },
      checkedIds(v) {
        
      },
    },
    methods: {
      initData() {
        const imgSrc = './picture/0.jpeg';
        const src = './picture/2.jpg';
        const picture = {
          name: '程开甲',
          date: '1918.8—2018.11',
          title: '中国核武器研究开创者',
          title2: '中国科学院院士',
          title3: '物理学家，核武器技术专家，两弹一星元勋',
          context: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;程开甲，江苏吴江人，祖籍徽州，1980年当选中国科学院学部委员（院士）。“两弹一星”功勋奖章获得者，我国核武器事业的开拓者之一，我国核试验科学技术体系的创建者之一，中国人民解放军总装备部科技委顾问。曾任浙江大学、南京大学教授，第二机械工业部核武器研究所副所长，国防科工委核实验基地研究所副所长、所长及基地副司令员，国防科工委（总装备部）科技委常委、顾问。</br>' +
           '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;程开甲是中国核武器研究的开创者之一，在核武器的研制和试验中作出突出贡献，开创、规划、领导了抗辐射加固技术新领域研究，是中国定向能高功率微波研究新领域的开创者之一。出版了中国第一本固体物理学专著，提出了普遍的热力学内耗理论，导出了狄拉克方程，提出并发展了超导电双带理论和凝聚态TFDC电子理论。'
        }
        let i = 0;
        const array = [];
        while (i < 98) {
          const pic = {
            id: i,
            style: '',
            type: 1,
            center: i,
            click: true,
            ...picture,
          };
          if (i === 90) {
            ++i;
            pic.gridStyle = 'grid-column: 7 / span 2;grid-row: 7;';
            pic.src = './picture/audio.png';
            pic.click = false;
          } else {
            if (i % 2 === 0) {
              pic.src = src;
            } else {
              pic.src = imgSrc;
            }
          }
          ++i;
          this.pictures.push(pic);
        }
      },
      click(img) {
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
          if (v.name.indexOf(str) >  -1 || str.indexOf(v.name) > -1) {
            this.click(v);
            break;
          }
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.picture {
  height: 100%;
  width: 100%;
  background-color: #000;
  .layout {
    height: 100%;
    background-color: #000;
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