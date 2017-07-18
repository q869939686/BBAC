import camera from '../camera';
import scene from '../scene';
import { renderer } from '../renderer';
import OrbitControls from 'three-orbitcontrols';
 // TransformControls from
import THREEx from './threex.domevents';

// var controls = new OrbitControls(camera, renderer.domElement);

// 鼠标控制
// controls.addEventListener('change', function (ev) {
//    return;
// })
//controls.maxPolarAngle = Math.PI / 2;
// controls.enableZoom = false; //缩放
// controls.enablePan = false; 
// controls.enableRotate = false; //转换

// 点击事件
var domEvents   = new THREEx.DomEvents(camera, renderer.domElement)
export {
  // controls,
  OrbitControls,
  domEvents
}
