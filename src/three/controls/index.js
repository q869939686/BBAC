import { Vector3 } from 'three';
import camera from '../camera';
import scene from '../scene';
import { renderer } from '../renderer';
import OrbitControls from 'three-orbitcontrols';
 // TransformControls from
import THREEx from './threex.domevents';

var controls = new OrbitControls(camera, renderer.domElement);

// 鼠标控制
controls.addEventListener('change', function (ev) {
   return;
})
controls.maxPolarAngle = Math.PI / 2;
controls.enableZoom = true; //缩放
controls.enablePan = false; 
controls.enableRotate = true; //转换

console.log(controls)
// 点击事件
var domEvents = new THREEx.DomEvents(camera, renderer.domElement);

var resetControls = function () {
    controls.target = new Vector3(0, 0, 0);
    controls.autoRotate = true;
    controls.update();
}
export {
  controls,
  OrbitControls,
  domEvents,
  resetControls
}
