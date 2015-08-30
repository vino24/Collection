/**
 * ********* ���� ***********
 */
// �ж�arr�Ƿ�Ϊһ�����飬����һ��boolֵ
var isArray = Function.isArray || function (arr) {
        return typeof arr
            === "object" && Object.prototype.toString.call(arr) === "[object Array]";
    };

/**
 *  �ж϶����Ƿ�Ϊ���������
 *  �ַ����ͺ�����length���ԣ�������typeof����ų����ͻ���JavaScript�У�DOM�ı��ڵ���length���ԣ�
 *  ������o.nodetype!=3����ų�
 */
function isArrayLike(o) {
    if (o &&                                    // o�Ƿ�null��undefined��
        typeof o === "object" &&                // o�Ƕ���
        isFinite(o.length) &&                   // o.length��������ֵ
        o.length >= 0 &&
        o.length === Math.floor(o.length) &&    // o.length������
        o.length < 4294967296)
        return true;
    else
        return false;
}

// ���������ȥ�ز�����ֻ����������Ԫ��Ϊ���ֻ��ַ���������һ��ȥ�غ������
function uniqArray(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        var ietm = arr[i];    // �����Ż�
        if (arr.indexOf(item, i + 1) == -1)
            result.push(item);
    }
    return result;
}

// ѹ��ϡ������
function dense(arr) {
    return arr.filter(function () {
        return true;
    });
}
//�������в������г��ֵ�x��������һ������ƥ������������
function findall(a, x) {
    var result = [],
        len = a.length,
        pos = 0;                    // ��ʼ������λ��
    while (pos < len) {
        pos = a.indexOf(x, pos);
        if (pos === -1) break;      //  δ�ҵ������������
        result.push(pos);
        pos += 1;                   //  ����һ��λ�ÿ�ʼ����
    }
    return result;
}


/**
 * ********* �ַ��� ***********
 */
//  �ж�str�Ƿ�Ϊ�ַ���
function isString(str) {
    // return Object.prototype.toString.call(str) === "[object String]";
    return Object.prototype.toString.call(str).slice(8, -1) === "String";
}

// ���ַ���ͷβ���пո��ַ���ȥ��������ȫ�ǰ�ǿո�Tab�ȣ�����һ���ַ���
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
 * ********* ���� ***********
 */
// �ж�fn�Ƿ�Ϊһ������������һ��boolֵ��ES5ֱ��Array.isArray(fn)
function isFunction(fn) {
    // your implement
    return Object.prototype.toString().call(fn) === "[object Function]";
}

//  ���ʵ��ʵ�ʸ��������������Ƿ���ͬ
function check(args) {
    var actual = args.length;     //  ʵ����ʵ����
    var expected = args.callee.length;    //  ����ʵ�θ���
    return actual === expected;
}

//  ����[from,to]�����n�������
function getRandom(from, to, n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr.push(Math.floor(Math.random() * (to - from + 1) + from));
    }
    return arr;
}

//  ����[from,to)�����n�������
function getRandomTwo(from, to, n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr.push(Math.random() * (to - from) + from);
    }
    return arr;
}


/**
 * ********* ���� ***********
 */
// ʹ�õݹ���ʵ��һ����ȿ�¡�����Ը���һ��Ŀ����󣬷���һ����������
// �����ƵĶ������ͻᱻ����Ϊ���֡��ַ��������������ڡ����顢Object���󡣲��������������������
function clone(src) {
    //���� ���� �ַ��� ���� null undefined
    if (src == null || typeof src != "object")
        return src;
    //���� Date
    else if (src instanceof Date) {
        var clone = new Date(src);
        return clone;
    }
    // ���� ����
    else if (src instanceof Array) {
        var clone = [];
        src.forEach(function (x) {
            clone.push(x);
        });
        return clone;
        // ���� Object
    } else if (src instanceof Object) {

        var clone = {};
        /*  ����һ
         for (var key in src) {

         if (src.hasOwnProperty(key))    // ���Լ̳�����
         clone[key] = clone(src[key]); //�ݹ�
         //  clone[key]=src[key]; //    ���һ�� ������������������������
         }
         */

        /*
         ������
         return JSON.parse(JSON.stringify(src));
         */
        //  ������
        var names = Object.getOwnPropertyNames(src);
        for (var i = 0; i < names.length; i++) {
            if (names[i] in clone) continue;
            var desc = Object.getOwnPropertyDescriptor(src, names[i]);
            Object.defineProperty(clone, names[i], desc);
        }
        return clone;
    }
}

// ��ȡһ�����������һ��Ԫ�ص�����������һ������
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
 * ********* ������ʽ ***********
 */
// �ж��Ƿ�Ϊ�����ַ
function isEmail(emailStr) {
    return emailStr.search(/^[a-z0-9]([-_\.]?[a-z0-9]+)*@([-_]?[a-z0-9]+)+[\.][a-z]{2,7}([\.][a-z]{2})?$/i) !== -1;
}

// �ж��Ƿ�Ϊ�ֻ���
function isMobilePhone(phone) {
    phone = phone + '';
    return phone.search(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) !== -1;
}
/**
 * ********* DOM ***********
 */
//  �ж�Ԫ���Ƿ���ĳ��class
function hasClass(element, ClassName) {
    var name = element.className.split(" ");
    if (name.indexOf(ClassName) !== -1)
        return true;
}

// Ϊelement����һ����ʽ��ΪnewClassName������ʽ
function addClass(element, newClassName) {
    if (!hasClass(element, newClassName))
        element.className += " " + newClassName;
}

// �Ƴ�element�е���ʽoldClassName
function removeClass(element, oldClassName) {
    if (hasClass(element, oldClassName))
        element.className = element.className.replace(oldClassName, "");
}
/**
 * ********* ���� ***********
 */
//  �жϵ�ǰ�ű�����ʱ�Ƿ�Ϊ�ϸ�ģʽ
var strict = (function () {
    return !this;
}());