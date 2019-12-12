/*
 * @Author: Porco
 * @Date: 2019-11-15 10:33:11
 * @LastEditTime: 2019-12-08 20:02:03
 * @Description: 函数工具类
 */

/**
 * @description: 防抖函数
 * @param {type}
 * @return:
 */
// export function debounce(fn, delay) {
//   let timer;
//   return function _fun(this, ...args) {
//     const _ = this;
//     if (timer) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//       fn.apply(_, args);
//     }, delay);
//   };
// }

/**
 * @description: 节流函数
 * @param {type}
 * @return:
 */
export function throttle(fn, delay) {
  let previous = 0;
  const _ = this;
  return function _fun(...args) {
    
    const now = new Date().getTime();
    if (now - previous > delay) {
      fn.apply(_, args);
      previous = now;
    }
  };
}
