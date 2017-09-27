// vuex
import store from '@/store';
// three
import { 
    Vector3,
    Mesh,
    BoxBufferGeometry,
    MeshStandardMaterial } from 'three';
import scene from '@/three/scene';
import camera, { cameraPosition } from '@/three/camera';
import {animate} from '@/three/renderer';
import {
    ObjectLoader,
    JSONloader,
    FBXLoader,
    loadOBJ
} from '@/three/loaders';
import { domEvents, controls } from '@/three/controls';
// model
// import { carPart } from '../car-parts';

import findMesh from '@/utils/three/mesh/findMesh';

// 异步加载模型1

window.axios.get('static/json/car-part/Z1/model.json')
.then((res) => {
    // model.json只是修复Y轴向↑
    carBody = ObjectLoader.parse(res.data);
    scene.add(carBody);
    // 调整控制中心
    controls.target = new Vector3(carBody.position.x + 61, carBody.position.y, carBody.position.z - 4);
    controls.autoRotate = true;
    controls.update();
    return true;
}).then(function () {
    /**
     * Z1部分的零件
     */
    // 前端
    window.axios.get('static/json/car-part/Z1/front-end.js')
    .then((res) => {
        // var parts = ObjectLoader.parse(res.data);
        // carBody.add(parts);
        var parts = JSONloader.parse(res.data);
        var mesh = new Mesh(parts.geometry, parts.materials);
        mesh.name = 'front-end';
        scene.add(mesh);
    })
    // 主底板
    window.axios.get('static/json/car-part/Z1/main-floor-board.json')
    .then((res) => {
        var parts = ObjectLoader.parse(res.data);
        carBody.add(parts);
    })
    // 后端
    window.axios.get('static/json/car-part/Z1/rear-end.js')
    .then((res) => {
        var parts = JSONloader.parse(res.data);
        var mesh = new Mesh(parts.geometry, parts.materials);
        scene.add(mesh);
    })
    // 左 飞机件
    window.axios.get('static/json/car-part/Z1/L-aircraft-parts.json')
    .then((res) => {
        var parts = ObjectLoader.parse(res.data);
        carBody.add(parts);
    })
    // 右 飞机件
    window.axios.get('static/json/car-part/Z1/R-aircraft-parts.json')
    .then((res) => {
        var parts = ObjectLoader.parse(res.data);
        carBody.add(parts);
    })
    // 右 底加强梁
    window.axios.get('static/json/car-part/Z1/L-bottom-strengthen-girder.json')
    .then((res) => {
        var parts = ObjectLoader.parse(res.data);
        carBody.add(parts);
    })
    // 右 底加强梁
    window.axios.get('static/json/car-part/Z1/R-bottom-strengthen-girder.json')
    .then((res) => {
        var parts = ObjectLoader.parse(res.data);
        carBody.add(parts);
    })
   
    /**
     * Z2.1部分的零件
     */
    // 后端 此文件是.obj， 导出时已经修复了y轴，所以只添加到scene中1
    loadOBJ(['static/json/car-part/Z2.1/Z2.1'], function (obj) {
        scene.add(obj);
        store.commit('LOADING_STATUS', true);
        setTimeout(function () {
            animate();
        }, 2000)
    })

     /**
     * Z2.2部分
     */
    // 侧围外板总成（右）
    window.axios.get('static/json/car-part/Z2.2/R-side-wall-planking-assembly.js')
    .then((res) => {
        var parts = JSONloader.parse(res.data);
        var mesh = new Mesh(parts.geometry, parts.materials);
        scene.add(mesh);
        
    })
    // 侧围外板总成（左）
    window.axios.get('static/json/car-part/Z2.2/L-side-wall-planking-assembly.js')
    .then((res) => {
        var parts = JSONloader.parse(res.data);
        var mesh = new Mesh(parts.geometry, parts.materials);
        scene.add(mesh);
        
    })
    // 后帽台围板
    window.axios.get('static/json/car-part/Z2.2/After-cap-table-coaming.js')
    .then((res) => {
        var parts = JSONloader.parse(res.data);
        var mesh = new Mesh(parts.geometry, parts.materials);
        scene.add(mesh);
    })

    // 其他
    window.axios.get('static/json/car-part/Z2.2/other.js')
    .then((res) => {
        var parts = JSONloader.parse(res.data);
        var mesh = new Mesh(parts.geometry, parts.materials);
        scene.add(mesh);
    })


    /**
     * Z2.3部分
     */
    // 顶盖
    window.axios.get('static/json/car-part/Z2.3/roof.js')
    .then((res) => {
        var parts = JSONloader.parse(res.data);
        var mesh = new Mesh(parts.geometry, parts.materials);
        scene.add(mesh);
        
    })

    // 后帽台
    window.axios.get('static/json/car-part/Z2.3/After-cap-table.js')
    .then((res) => {
        var parts = JSONloader.parse(res.data);
        var mesh = new Mesh(parts.geometry, parts.materials);
        scene.add(mesh);
        
    })

    /**
     * Z3部分的零件
     */
    // 行李箱盖
    window.axios.get('static/json/car-part/Z3/boot-cover.js')
    .then((res) => {
        var parts = JSONloader.parse(res.data);
        var mesh = new Mesh(parts.geometry, parts.materials);
        scene.add(mesh);
    })
    // 前机盖
    window.axios.get('static/json/car-part/Z3/front-machine-cover.js')
    .then((res) => {
        var parts = JSONloader.parse(res.data);
        var mesh = new Mesh(parts.geometry, parts.materials);
        scene.add(mesh);
    })
    // 左翼子板
    window.axios.get('static/json/car-part/Z3/left-sub-board.js')
    .then((res) => {
        var parts = JSONloader.parse(res.data);
        var mesh = new Mesh(parts.geometry, parts.materials);
        scene.add(mesh);
    })
    // 右翼子板
    window.axios.get('static/json/car-part/Z3/right-sub-board.js')
    .then((res) => {
        var parts = JSONloader.parse(res.data);
        var mesh = new Mesh(parts.geometry, parts.materials);
        scene.add(mesh);
    })
    // 左前门
    window.axios.get('static/json/car-part/Z3/LF-car-door.json')
    .then((res) => {
        var parts = ObjectLoader.parse(res.data);
        // carBody.add(parts);
        // var parts = JSONloader.parse(res.data);
        var mesh = new Mesh(parts.geometry, parts.materials);
        mesh.name = 'LF-car-door';
        scene.add(parts);
       
        // 添加点击事件
        domEvents.addEventListener(parts, 'dblclick', function (ev) {
            // 通知store 现在的状态是到零件了，页面会做出相关响应(暂时是展示back home小图标)
            // store.dispatch(changeToPartStatus(true))
            var target = ev.target;
            scene.children.forEach(function (child) {
                if (child.name !== target.name && !child.isLight) {
                    child.visible = false;
                }
            })
            toCarPart(findMesh(target, 'poin-center'), 42);
        }, false);
    })
    // 左后门
    window.axios.get('static/json/car-part/Z3/LR-car-door.js')
    .then((res) => {
        var parts = JSONloader.parse(res.data);
        var mesh = new Mesh(parts.geometry, parts.materials);
        scene.add(mesh);
    })
    // 右前门
    window.axios.get('static/json/car-part/Z3/RF-car-door.js')
    .then((res) => {
        var parts = JSONloader.parse(res.data);
        var mesh = new Mesh(parts.geometry, parts.materials);
        scene.add(mesh);
    })
    // 右前门
    window.axios.get('static/json/car-part/Z3/RR-car-door.js')
    .then((res) => {
        var parts = JSONloader.parse(res.data);
        var mesh = new Mesh(parts.geometry, parts.materials);
        scene.add(mesh);
    })
})


// 整车车身    
export var carBody = null;

/**
 * 模型加载完成处理
 * @param {Object} carBody model
 * @return {void}
 */
function loadCompleted (moduleCar) {
    // 解析JSON为three的scene;1
    var parts = ObjectLoader.parse(moduleCar);
    carBody.add(parts);
    scene.add(carBody);
    // toCarPart(carBody);
    // camera.position = findMesh(carBody, 'poin-center').position
    animate();
    
    // 透明的包裹层
    var wrap = null;
    carBody.children.forEach((Mesh) => {
        if (Mesh.name === 'mouseout') {
            wrap = Mesh;
            domEvents.addEventListener(wrap, 'mouseout', function (event) {
                if (event.intersect === undefined) {
                    showTarget(carBody, null, 'out');
                    wrap.material.transparent = true;
                    wrap.material.opacity = 0;
                }
            }, false);
            return false;
        }
        domEvents.addEventListener(Mesh, 'mouseover', function (event) {
            showTarget(carBody, event.target, 'over');
            wrap.material.opacity = 0;
        }, false);
        domEvents.addEventListener(Mesh, 'dblclick', function (ev) {
            if (ev.target.name === 'part_27') {
                carPart.visible = true;
                carBody.visible = false;
                toCarPart(findMesh(carPart, 'part_wrap'));
                // 通知store 现在的状态是到零件了，页面会做出相关响应(暂时是展示back home小图标)
                store.dispatch(changeToPartStatus(true))
            }
        }, false);
    });
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
    // 设置透明
    Array.isArray(group.children) && group.children.forEach(function (Mesh) {
        Mesh.material.transparent = transparent;
        Mesh.material.opacity = opacity;
    });
    // target不透明
    if (alter === 'over') {
        target.material.transparent = false;
        target.material.opacity = 1; 
    }
}
/**
 * 设置相机焦点，聚焦到零部件
 * @param {Mesh} target
 * @param {Number} z轴
 */
export var toCarPart = function (target, z = 0) {
    if (target === null || target === undefined) {
        console.warn('target 不存在');
        return;
    }
    // 移动到零件的位置(动画) TODO position还需研究
    cameraPosition
    .to({
        x: target.position.x,
        y: target.position.y,
        z: target.position.z - z
    }, 200)
    .start()
    .once('complete', function () {
        controls.target = new Vector3(target.position.x, target.position.y + 1, target.position.z);
        controls.autoRotate = true;
        controls.update();
    });
}
