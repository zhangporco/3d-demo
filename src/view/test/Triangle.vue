<template>
  <div class='triangle'></div>
</template>
<style lang='scss' scoped>
.triangle{
    position:relative;
    width: 670px;
    height: 79px;
    line-height: 79px;
    background:rgba(0,0,0,1);
    box-shadow:0px 6px 20px 0px rgba(0,0,0,0.2);
    border-radius: 12px;
    opacity:0.7;
    text-align: center;
    color: #ffffff;
}
.triangle:after {
    display:block;
    content:"";
    width: 28px;
    height: 28px;
    border-bottom-right-radius: 8px;
    background: rgba(0,0,0,1);
    transform: rotate(45deg);
    -ms-transform:rotate(45deg);
    -moz-transform:rotate(45deg);
    -webkit-transform:rotate(45deg);
    -o-transform:rotate(45deg); 
    position: absolute;
    top: 65px;
    right: 50%;
}
// .triangle:before,.triangle:after {
// 	display:block;
// 	content:"";
// 	width:0px;
// 	height:0px;
// 	border-left:15px solid transparent;
//   border-right:15px solid transparent;
//   position:absolute;
// }
// .triangle:before{
// 	border-top:15px solid rgba(0,0,0,1);
// 	top:100%;
//   left: 48%;
// }
// .triangle:after{
// 	border-top:15px solid rgba(0,0,0,1);
// 	top:99%;
//   left: 48%;
// }
</style>