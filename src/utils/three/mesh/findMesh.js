/**
 * 按name查找
 * @param {Object3D} Mesh | group
 * @param {string} targetName
 * @return {Mesh}
 */
var findMesh = function (obj, targetName) {
    var res = null; // 需要返回出取的
    if (!obj) {
        throw Error('obj不存在');
    }
    if (obj.name === targetName) {
        return obj;
    }
    if (obj.children.length > 0) {
        obj.children.some(function (childObj) {
            if (childObj.name === targetName) {
                res = childObj;
                return true;
            }
            // if childObj.children.length greater than 0, Continue to find it
            if (childObj.children.length > 0) {
                findMesh(childObj, targetName);
            }
            return false;
        });
    }
    return res;
}
export default findMesh;