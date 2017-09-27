import { PerspectiveCamera, Vector3 } from 'three'
import {Tween} from 'es6-tween';
var camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000000)

camera.position.z = 10;
// 矫正相机位置
//  camera.position.set(
//     -5.0533396843205836,
//     1.1110786173302802,
//     0
// ) 
// camera.rotation.set( -0,  -1.6,  0);
camera.position.set(
    -25.383997199196685,
    68.47368705261472,
    94.71213678587537
)
camera.rotation.set( -0.6064652641944714,  -0.6233970418493311,  -0.38477697986531856)
camera.lookAt({x:10,y:50,z:60});
// 相机的运动
export var cameraPosition = new Tween(camera.position);

export default camera
