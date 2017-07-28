/**
 * 给材质设置透明度
 * @param {Object3D} Object3D 
 * @param {number} opacity
 */
export default function transparent (obj, opacity) {
    
    if (!obj.isObject3D) {
        return;
    }
    
    if ((obj.type === 'Scene' || obj.type === 'Group') && obj.children.length > 0) {

        // 可能是个group
        if (obj.children.length > 0) {
            obj.children.forEach(function (childObj, i) {
                transparent(childObj, opacity);
            });
        }
    }
    if (obj.type.indexOf('Mesh') !== -1) {
        obj.material.transparent = true;
        obj.material.opacity = 0;
        console.log(obj.material)
        if (obj.children.length > 0) {
            obj.children.forEach(function (childMesh, i) {
                transparent(childMesh, opacity);
            });
        }
    }
}