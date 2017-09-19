import camera from '../camera'
import scene from '../scene'
import { WebGLRenderer } from 'three'
import { Tween, update } from 'es6-tween'

var renderer = new WebGLRenderer();

var renderContainerElement = null;
var isAnimate = true; // 假设不在当前页面了就不渲染
/**
 * 初始化Render
 * @param {Element} 装canvas的容器元素
 * @return {renderer} 返回一个渲染器
 */
var initRenderer = function (el) {
    renderContainerElement = el
    renderer.setSize(window.innerWidth,window.innerHeight)
    renderer.setClearColor(0x101010, 1.0)
    window.addEventListener( 'resize', onWindowResize, false )
    renderer.render(scene, camera);
    return renderer
}

var onWindowResize = function () {
    var width = 0;
    var height = 0;
    // 容器不一定是最大化
    if (renderContainerElement !== null) {
      width = renderContainerElement.offsetWidth;
      height = renderContainerElement.offsetHeight;
    } else {
      width = window.innerWidth;
      height = window.innerHeight;
    }
    camera.aspect = (width/2) / (height/2);
    camera.updateProjectionMatrix();
    renderer.setSize( width, height );
}

//动画
var animateRunList = []; // 在animate中要执行的操作队列(可能未来会在aniamte函数中添加更多东西，直接push到animateRunList中)

var animate = function () {
  if (!isAnimate) {return;}
  for (let i = 0; i < animateRunList.length; i ++) {
    var fn = animateRunList[i];
    if (typeof fn === 'function') {
      fn();
    }
  }
  requestAnimationFrame( animate );
};

// 添加在animate中要执行的操作队列
animateRunList.push(update);
animateRunList.push(function () {
  renderer.render(scene, camera);
});

/**
 * 设置是否渲染动画
 * @param {boolean}  
 */
var setAnimateable = function (boolean) {
  if (boolean === true) {
    isAnimate = true;
    animate();
  } else {
    isAnimate = false;
  }
}

export {
  renderer,
  initRenderer,
  animate,
  animateRunList,
  setAnimateable,
}
