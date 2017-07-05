import camera from '../camera'
import scene from '../scene'
import { WebGLRenderer } from 'three'
import { Tween } from 'es6-tween'

var renderer = null
var windowHalfX = window.innerWidth / 2
var windowHalfY = window.innerHeight / 2

// 初始化Render
var initRenderer = function () {
    renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth,window.innerHeight)
    renderer.setClearColor(0x101010, 1.0)
    window.addEventListener( 'resize', onWindowResize, false )
}

var onWindowResize = function () {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
initRenderer()

//动画

var animate = function () {
  requestAnimationFrame( animate );
  renderer.render(scene, camera);
};

export {
  renderer,
  animate
}
