import { PerspectiveCamera, Vector3 } from 'three';
import scene from '@/three/scene';
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




// Front

// -84.228368539148
// 27.726690181742146
// 1.9057905945526459


// left


// 24.35866501962054
// 27.72669018174217
// -144.6540790803623

// top


    // 13.0705977601392
    // 139.99158190941083
    // -3.763071838228776

/**
 * 改变相机视角
 * @param {Store} store 
 * @param {Object} posiotion 
 */
export var changeCamera = function (store, controls, posiotion) {
    // 清空图表数据 
    store.commit('GET_CHART_DATA', [])// VUe内 ，可以直接this.$store，不用引用
    store.commit('TO_PART', false);
    store.commit('CAR_PARTS_INFO', {
        id: '',
        name: ''
    });
    // 显示全部的部件
    scene.children.forEach(function (child) {
        child.visible = true;
    })
    // reset camera posiotion
    cameraPosition
    .to(posiotion, 20)
    .start()
    .once('complete', function () {
        // 纠正 controls
        controls.target = new Vector3(61, 0, -4);
        controls.autoRotate = true;
        controls.update();
    });
}

/**
 * @param {String} 'in' 放大 | 'out' 缩小
 */
export var cameraZoom = function (action) {
    var dis = action === 'in' ? 0.5 : -0.5;
    var newZoom = camera.zoom + dis;
    if (newZoom > 4) {
        newZoom = 4;
        return;
    } else if (newZoom < 0.4) {
        newZoom = 0.4;
        return;
    }
    camera.zoom = newZoom;
    camera.updateProjectionMatrix();
}