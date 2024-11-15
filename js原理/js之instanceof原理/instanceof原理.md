instance是根据原型链来查找的，实现如下：
```
    function myInstanceof(left, right) {
    // 获取右侧构造函数的原型对象
    let prototype = right.prototype;
    
    // 获取左侧对象的原型
    left = left.__proto__;
    
    // 沿着原型链向上查找
    while (left !== null) {
        if (left === prototype) {
            return true;
        }
        left = left.__proto__;
    }
    
    return false;
}

// 测试用例
function Animal() {}
function Dog() {}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const dog = new Dog();

console.log(myInstanceof(dog, Dog));      // 输出: true
console.log(myInstanceof(dog, Animal));   // 输出: true
console.log(myInstanceof(dog, Object));   // 输出: true
console.log(myInstanceof(dog, String));   // 输出: false

```