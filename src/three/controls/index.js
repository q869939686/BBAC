import camera from '../camera';
import scene from '../scene';
import { renderer } from '../renderer';
import OrbitControls from 'three-orbitcontrols';
import TransformControls from './three-transformcontrols';
import THREEx from './threex.domevents';
console.log(TransformControls)
var controls = new OrbitControls(camera, renderer.domElement);

console.log(OrbitControls)
// 鼠标控制
controls.addEventListener('change', function (ev) {
   return;
})
//controls.maxPolarAngle = Math.PI / 2;
controls.enableZoom = false; //缩放
controls.enablePan = false; 
controls.enableRotate = true; //转换

console.log()
// 点击事件
var domEvents   = new THREEx.DomEvents(camera, renderer.domElement)
export {
  // controls,
  OrbitControls,
  domEvents
}
