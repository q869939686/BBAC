// 3d必备：camera,scene,renderer
import camera from './camera'
import scene from './scene'
import { renderer, animate, initRenderer } from './renderer'
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
import './scenes/sky';

// assets:3D model,img
animate()
export default initRenderer;