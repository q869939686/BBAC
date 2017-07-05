// 3d必备：camera,scene,renderer
import camera from './camera'
import scene from './scene'
import { renderer, animate } from './renderer'
// 灯光
import { pointLight, ambientLight } from './scenes/light'
// loader
import {
  jsonLoader,
  objLoader,
  mtlLoader,
  loadJson
} from './loaders'
// controls(鼠标交互)
import { controls, domEvents } from './controls'
// scenes:
// assets:3D model,img

/*window.setTimeout(function () {
  renderer.render(scene, camera)
  document.body.appendChild( renderer.domElement )
},10)*/
renderer.render(scene, camera);
export default renderer.domElement;