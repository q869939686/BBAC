

/**
 * TargetControls
 */
class TargetControls {

    constructor (target, dom) {
        this.init(target, dom);
    }
    init () {

    }
    /**
     * add Event to target
     * @param {string} eventName 
     * @param {function} fn
     * @return {void}
     */
    addEventListener (eventName, fn) {
        new addEvent(target, dom, );
    }
}
class addEvent {
    doms = [];
    constructor (dom) {
        this.init();
    }
    /*  */
    init (dom) {
        if (dom instanceof HTMLElement) {
            
        }
        // 没添加过才添加
        if (doms.indexOf(dom) === -1) {
            dom.addEventListener('mousedown', () => {
                dom.addEventListener('mousemove', () => {
                    
                }, false);
                dom.addEventListener('mouseup', () => {
                    
                }, false);
            }, false);
        }
    }
    /**
     * add evnet to dom
     * @param {string} eventName
     */
    addEventListener (eventName) {

    }
    
}


