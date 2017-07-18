import scene from '@/three/scene';
import { Group } from 'three';
import OrbitControls from 'three-orbitcontrols';
import {
    loadJson,
    jsonLoader
} from '@/three/loaders';
import { domEvents } from '@/three/controls';
import { renderer } from '@/three/renderer';
// redux
import store from '@/store';
import { loadingStatus } from '@/store/actions';

// 异步加载模型
require.ensure([], () => {
    let moduleCar = require('@/static/json/model-car.json');
    loadCompleted(moduleCar)
}, 'moduleCar')

/**
 * 模型加载完成处理
 * @param {Object} car model
 * @return {void}
 */
function loadCompleted (moduleCar) {
    // 解析JSON为three的scene;
    var car = jsonLoader.parse(moduleCar);
    scene.add(car);
    // 通知store加载完成
    store.dispatch(loadingStatus(true));
    // 透明的包裹层
    var wrap = null;
    car.children.forEach((Mesh) => {
        if (Mesh.name === 'mouseout') {
            wrap = Mesh;
            domEvents.addEventListener(wrap, 'mouseout', function (event) {
                if (event.intersect === undefined) {
                    showTarget(car, null, 'out');
                    wrap.material.transparent = true;
                    wrap.material.opacity = 0;
                }
            }, false);
            return false;
        }
        domEvents.addEventListener(Mesh, 'mouseover', function (event) {
            showTarget(car, event.target, 'over');
            wrap.material.opacity = 0;
        }, false);
    });
    // car控制器
    /* renderer.domElement.addEventListener('mousedown', function (ev) {
        var startX = ev.clientX;
        var startY = ev.clientY;
        renderer.domElement.addEventListener('mousemove', handleMove);
        
        renderer.domElement.addEventListener("mouseup", handleUp);
        function handleMove (ev) {
            var x = (startX - ev.clientX);
            var y = (startY - ev.clientY);
            console.log(y)
            // car.rotation.x = x;
            car.rotation.y += (y * Math.PI / 180);
        }
        function handleUp () {
            renderer.domElement.removeEventListener('mousemove', handleMove);
            renderer.domElement.removeEventListener('mouseup', handleUp);
        }
    }); */
}
/**
 * 非选中目标透明
 * @param {Group} group not material, must has children
 * @param {Mesh} target 选中目标 when alter='out' target = null
 * @param {string} alter = 'over' | 'out'
 * @return {void}
 */
export function showTarget (group, target, alter) {
    var opacity = alter === 'over'? 0.3 : 1;
    var transparent = alter === 'over'? true : false;
    Array.isArray(group.children) && group.children.forEach(function (Mesh) {
        Mesh.material.transparent = transparent;
        Mesh.material.opacity = opacity;
    });
    if (alter === 'over') {
        target.material.transparent = false;
        target.material.opacity = 1; 
    }
}