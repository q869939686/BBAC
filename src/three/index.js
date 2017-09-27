// 3d必备：camera,scene,renderer
import camera from './camera'
import scene from './scene'
import { renderer, animate, initRenderer } from './renderer'

// loader
import {
  jsonLoader,
  objLoader,
  FBXLoader,
  loadJson
} from './loaders'
// controls(鼠标交互)
import { controls, domEvents } from './controls'

// scenes(所有场景):
// 灯光
import './scenes/light'

// assets:3D model,img
import './scenes/car/car-body'
export {
  initRenderer,
  animate
}