instance是根据原型链来查找的，实现如下：
```
    function(instance, className) {
        let pointor = instance;
        while(pointor){
            if (pointor === className.prototype) {
                return true
            }
            pointer = pointor.__proto__
        }
        return false
    }

```