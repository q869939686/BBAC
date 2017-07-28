import { PerspectiveCamera, Vector3 } from 'three'
import {Tween} from 'es6-tween';
var camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000000)
// 矫正相机位置
 camera.position.set(
    -5.0533396843205836,
    1.1110786173302802,
    0
) 
camera.rotation.set( -0,  -1.6,  0);

/*camera.position.set(
    -3.0533396843205836,
    2.1110786173302802,
    1.0573666722026434
)*/ 
// camera.rotation.set( -0.20783558173798408,  -0.09429695894176246,  0.019853346558090398)
// camera.lookAt({x:10,y:50,z:60});

export var cameraPosition = new Tween(camera.position);

export default camera
