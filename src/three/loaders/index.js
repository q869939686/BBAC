
var THREE = require('three')
import createFBXLoader from './FBXLoader';

createFBXLoader(THREE);
require('./MTLLoader')
require('./OBJLoader')

//外部资源加载器
var ObjectLoader = new THREE.ObjectLoader();
var JSONloader = new THREE.JSONLoader();
var FBXLoader = new THREE.FBXLoader();

var objLoader = new THREE.OBJLoader()
var mtlLoader = new THREE.MTLLoader()
// var materialLoader = new THREE.MaterialLoader()
// var fontLoader = new FontLoader()

/**
 * 加载JSON格式模型
 * @param {array} [.json model] 
 * @param {function} [callback function] 
 */
var loadObject = function (arr, callback) {
    arr.forEach(function(item){
        ObjectLoader.load(
            // 资源链接
            item,
            // 资源加载完成后的回调函数
            function ( obj) {
                //添加点击事件
                callback && callback(obj)
            }
        );
  })
}
/*
  加载.mtl资源
  @param {array} [3dMaxs model]
  @param {function} [callback function]
  @return {void}
*/
function loadOBJ (arr, callback) {
    arr.map(function(item){
        mtlLoader.load( item + '.mtl', function( materials ) {
            materials.preload();
            objLoader.setMaterials( materials );
            objLoader.load(
                // 资源链接
                item + '.obj',
                // 资源加载完成后的回调函数
                function ( obj) {
                    // scene.add( obj );
                    callback && callback(obj)
                }
            );
        });
    })
}
export {
  ObjectLoader,
  JSONloader,
  FBXLoader,
  // objLoader,
  // mtlLoader,
  loadObject,
  loadOBJ
}
