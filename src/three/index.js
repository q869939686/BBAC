// 3d必备：camera,scene,renderer
import camera from './camera'
import scene from './scene'
import { renderer, animate, initRenderer } from './renderer'

// loader
import {
  jsonLoader,
  objLoader,
  mtlLoader,
  loadJson
} from './loaders'
// controls(鼠标交互)
import { controls, domEvents } from './controls'

// scenes(所有场景):
// 灯光
import { pointLight, ambientLight } from './scenes/light'

import './scenes/test';
import './scenes/car';
console.log(scene)
// assets:3D model,img
// animate()
export {
  initRenderer
}