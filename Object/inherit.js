//  通过原型继承创建一个新对象
function inherit(p) {
    if (p === null) throw TypeError();
    if (Object.create)      //  ES5
        return Object.create(p);
    var t = typeof p;
    if (t !== "object" && t !== "function") throw TypeError();
    function f() {
    };
    f.prototype = p;
    return new f();
}

//  寄生组合式继承
function inheritPrototype(subType, superType) {
    var prototype = inherit(superType.prototype);   //  创建对象
    prototype.constructor = subType;    //  增强对象
    subType.prototype = prototype;  //  指定对象
}