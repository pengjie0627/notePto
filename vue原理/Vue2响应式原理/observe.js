import Observer from './Observer.js';
export default function (value) {
    // 如果value不是对象，什么都不做
    if (typeof value != 'object') return;
    // 定义ob
    var ob;
    if (typeof value.__ob__ !== 'undefined') {
        // 若含有__ob__则说明该对象已经是响应式的不需要再观测
        ob = value.__ob__;
    } else {
        ob = new Observer(value);
    }
    return ob;
}
