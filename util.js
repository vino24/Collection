/**
 * ********* 数组 ***********
 */
// 判断arr是否为一个数组，返回一个bool值
var isArray = Function.isArray || function (arr) {
        return typeof arr
            === "object" && Object.prototype.toString.call(arr) === "[object Array]";
    };

/**
 *  判断对象是否为类数组对象
 *  字符串和函数有length属性，可以用typeof检测排除，客户端JavaScript中，DOM文本节点有length属性，
 *  可以用o.nodetype!=3检测排除
 */
function isArrayLike(o) {
    if (o &&                                    // o是非null、undefined等
        typeof o === "object" &&                // o是对象
        isFinite(o.length) &&                   // o.length是有限数值
        o.length >= 0 &&
        o.length === Math.floor(o.length) &&    // o.length是整数
        o.length < 4294967296)
        return true;
    else
        return false;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        var ietm = arr[i];    // 性能优化
        if (arr.indexOf(item, i + 1) == -1)
            result.push(item);
    }
    return result;
}

// 压缩稀疏数组
function dense(arr) {
    return arr.filter(function () {
        return true;
    });
}
//在数组中查找所有出现的x，并返回一个包含匹配索引的数组
function findall(a, x) {
    var result = [],
        len = a.length,
        pos = 0;                    // 开始搜索的位置
    while (pos < len) {
        pos = a.indexOf(x, pos);
        if (pos === -1) break;      //  未找到，就完成搜索
        result.push(pos);
        pos += 1;                   //  从下一个位置开始搜索
    }
    return result;
}


/**
 * ********* 字符串 ***********
 */
//  判断str是否为字符串
function isString(str) {
    // return Object.prototype.toString.call(str) === "[object String]";
    return Object.prototype.toString.call(str).slice(8, -1) === "String";
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
function trim(str) {
    if (String.prototype.trim) {
        return str.trim();
    }
    else {
        return str.replace(/^\s+|\s+$/g, '');
    }
}

function each(arr, fn) {
    for (var i = 0, len = arr.length; i < len; i++) {
        fn(arr[i], i);
    }
}

/**
 * ********* 函数 ***********
 */
// 判断fn是否为一个函数，返回一个bool值，ES5直接Array.isArray(fn)
function isFunction(fn) {
    // your implement
    return Object.prototype.toString().call(fn) === "[object Function]";
}

//  检测实参实际个数与期望个数是否相同
function check(args) {
    var actual = args.length;     //  实参真实个数
    var expected = args.callee.length;    //  期望实参个数
    return actual === expected;
}

//  产生[from,to]区间的n个随机数
function getRandom(from, to, n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr.push(Math.floor(Math.random() * (to - from + 1) + from));
    }
    return arr;
}

//  产生[from,to)区间的n个随机数
function getRandomTwo(from, to, n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr.push(Math.random() * (to - from) + from);
    }
    return arr;
}


/**
 * ********* 对象 ***********
 */
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function clone(src) {
    //对于 数字 字符串 布尔 null undefined
    if (src == null || typeof src != "object")
        return src;
    //对于 Date
    else if (src instanceof Date) {
        var clone = new Date(src);
        return clone;
    }
    // 对于 数组
    else if (src instanceof Array) {
        var clone = [];
        src.forEach(function (x) {
            clone.push(x);
        });
        return clone;
        // 对于 Object
    } else if (src instanceof Object) {

        var clone = {};
        /*  方法一
         for (var key in src) {

         if (src.hasOwnProperty(key))    // 忽略继承属性
         clone[key] = clone(src[key]); //递归
         //  clone[key]=src[key]; //    结果一致 可能是由于是引用类型所致
         }
         */

        /*
         方法二
         return JSON.parse(JSON.stringify(src));
         */
        //  方法三
        var names = Object.getOwnPropertyNames(src);
        for (var i = 0; i < names.length; i++) {
            if (names[i] in clone) continue;
            var desc = Object.getOwnPropertyDescriptor(src, names[i]);
            Object.defineProperty(clone, names[i], desc);
        }
        return clone;
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectNum(obj) {
    var element = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            element++;
        }
    }
    return element;
}
/**
 * ********* 正则表达式 ***********
 */
// 判断是否为邮箱地址
function isEmail(emailStr) {
    return emailStr.search(/^[a-z0-9]([-_\.]?[a-z0-9]+)*@([-_]?[a-z0-9]+)+[\.][a-z]{2,7}([\.][a-z]{2})?$/i) !== -1;
}

// 判断是否为手机号
function isMobilePhone(phone) {
    phone = phone + '';
    return phone.search(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) !== -1;
}
/**
 * ********* DOM ***********
 */
//  判断元素是否有某个class
function hasClass(element, ClassName) {
    var name = element.className.split(" ");
    if (name.indexOf(ClassName) !== -1)
        return true;
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if (!hasClass(element, newClassName))
        element.className += " " + newClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if (hasClass(element, oldClassName))
        element.className = element.className.replace(oldClassName, "");
}
/**
 * ********* 环境 ***********
 */
//  判断当前脚本运行时是否为严格模式
var strict = (function () {
    return !this;
}());