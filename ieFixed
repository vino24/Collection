/*
 *   处理浏览器兼容性
 * */
var ieFixed = {
    /*
     *   检测是否为IE及其版本
     *   @param {version} 版本号
     * */
    isIE: function (version) {
        var b = document.createElement('b');
        b.innerHTML = '<!--[if IE ' + version + ']><i></i><![endif]-->';
        return b.getElementsByTagName('i').length === 1;
    },

    fixed: function () {
        if (this.isIE()) {   //  检测是否为IE浏览器
            /*
             *   *** Function ***
             * */
            Function.prototype.bind = function (oThis) {
                if (typeof this !== "function") {
                    // closest thing possible to the ECMAScript 5 internal IsCallable function
                    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                }

                var aArgs = Array.prototype.slice.call(arguments, 1),
                    fToBind = this,
                    fNOP = function () {
                    },
                    fBound = function () {
                        return fToBind.apply(this instanceof fNOP && oThis
                                ? this
                                : oThis || window,
                            aArgs.concat(Array.prototype.slice.call(arguments)));
                    };

                fNOP.prototype = this.prototype;
                fBound.prototype = new fNOP();

                return fBound;
            };

            /*
             *   *** Array ***
             * */
            Array.prototype.filter = function (fun /*, thisArg */) {
                "use strict";
                if (this === void 0 || this === null)
                    throw new TypeError();
                var t = Object(this);
                var len = t.length >>> 0;
                if (typeof fun !== "function")
                    throw new TypeError();
                var res = [];
                var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
                for (var i = 0; i < len; i++) {
                    if (i in t) {
                        var val = t[i];
                        if (fun.call(thisArg, val, i, t))
                            res.push(val);
                    }
                }
                return res;
            };

            Array.prototype.forEach = function (fun /*, thisp*/) {
                var len = this.length;
                if (typeof fun != "function")
                    throw new TypeError();
                var thisp = arguments[1];
                for (var i = 0; i < len; i++) {
                    if (i in this)
                        fun.call(thisp, this[i], i, this);
                }
            };

            Array.prototype.indexOf = function (obj) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == obj) {
                        return i;
                    }
                }
                return -1;
            };
            Array.prototype.some = function (fun /*, thisArg */) {
                'use strict';
                if (this === void 0 || this === null)
                    throw new TypeError();

                var t = Object(this);
                var len = t.length >>> 0;
                if (typeof fun !== 'function')
                    throw new TypeError();

                var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
                for (var i = 0; i < len; i++) {
                    if (i in t && fun.call(thisArg, t[i], i, t))
                        return true;
                }

                return false;
            };
            Array.prototype.every = function (fun /*, thisArg */) {
                'use strict';

                if (this === void 0 || this === null)
                    throw new TypeError();

                var t = Object(this);
                var len = t.length >>> 0;
                if (typeof fun !== 'function')
                    throw new TypeError();

                var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
                for (var i = 0; i < len; i++) {
                    if (i in t && !fun.call(thisArg, t[i], i, t))
                        return false;
                }

                return true;
            };
            Array.prototype.map = function (callback, thisArg) {

                var T, A, k;

                if (this == null) {
                    throw new TypeError(' this is null or not defined');
                }

                // 1. Let O be the result of calling ToObject passing the |this|
                //    value as the argument.
                var O = Object(this);

                // 2. Let lenValue be the result of calling the Get internal
                //    method of O with the argument "length".
                // 3. Let len be ToUint32(lenValue).
                var len = O.length >>> 0;

                // 4. If IsCallable(callback) is false, throw a TypeError exception.
                // See: http://es5.github.com/#x9.11
                if (typeof callback !== 'function') {
                    throw new TypeError(callback + ' is not a function');
                }

                // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
                if (arguments.length > 1) {
                    T = thisArg;
                }

                // 6. Let A be a new array created as if by the expression new Array(len)
                //    where Array is the standard built-in constructor with that name and
                //    len is the value of len.
                A = new Array(len);

                // 7. Let k be 0
                k = 0;

                // 8. Repeat, while k < len
                while (k < len) {

                    var kValue, mappedValue;

                    // a. Let Pk be ToString(k).
                    //   This is implicit for LHS operands of the in operator
                    // b. Let kPresent be the result of calling the HasProperty internal
                    //    method of O with argument Pk.
                    //   This step can be combined with c
                    // c. If kPresent is true, then
                    if (k in O) {

                        // i. Let kValue be the result of calling the Get internal
                        //    method of O with argument Pk.
                        kValue = O[k];

                        // ii. Let mappedValue be the result of calling the Call internal
                        //     method of callback with T as the this value and argument
                        //     list containing kValue, k, and O.
                        mappedValue = callback.call(T, kValue, k, O);

                        // iii. Call the DefineOwnProperty internal method of A with arguments
                        // Pk, Property Descriptor
                        // { Value: mappedValue,
                        //   Writable: true,
                        //   Enumerable: true,
                        //   Configurable: true },
                        // and false.

                        // In browsers that support Object.defineProperty, use the following:
                        // Object.defineProperty(A, k, {
                        //   value: mappedValue,
                        //   writable: true,
                        //   enumerable: true,
                        //   configurable: true
                        // });

                        // For best browser support, use the following:
                        A[k] = mappedValue;
                    }
                    // d. Increase k by 1.
                    k++;
                }

                // 9. return A
                return A;
            };
            /*
             *   *** HTTP ***
             * */
            window.XMLHttpRequest = function () {
                try {
                    //  ActiveX对象新版本
                    return new ActiveXObject("Msxml2.XMLHTTP.6.0");
                }
                catch (e1) {
                    try {
                        //  ActiveX对象旧版本
                        return new ActiveXObject("Msxml2.XMLHTTP.3.0");
                    }
                    catch (e2) {
                        throw new TypeError("XMLHttpRequest is not supported");
                    }
                }
            };

            /*
             *   *** CSS ***
             * */
            window.getComputedStyle = function (el, pseudo) {
                this.el = el;
                this.getPropertyValue = function (prop) {
                    var re = /(\-([a-z]){1})/g;
                    if (prop == 'float') prop = 'styleFloat';
                    if (re.test(prop)) {
                        prop = prop.replace(re, function () {
                            return arguments[2].toUpperCase();
                        });
                    }
                    return el.currentStyle[prop] ? el.currentStyle[prop] : null;
                }
                return this;
            }
        }
    },
    // Element dataset
    getDataSet: function (elt) {
        if (ele.dataset) {
            return ele.dataset;
        }
        var datas = {};
        var attrs = ele.attributes;
        var nodeName, nodeNames;
        for (var i = 0, attr; attr = attrs[i]; i++) {
            nodeName = attr.nodeName;
            if (nodeName.indexOf('data-') !== -1) {
                nodeNames = nodeName.slice(5).split("-");
                nodeName = nodeNames[0];
            } else {
                continue;
            }
            for (var j = 1; j < nodeNames.length; j++) {
                nodeName += nodeNames[j].slice(0, 1).toUpperCase + nodeNames[j].slice(1);
            }
            datas[nodeName] = attr.nodeValue;
            return datas;
        }
    },
    //  序列化
    stringify: function (obj) {
        //如果是IE8+ 浏览器(ff,chrome,safari都支持JSON对象)，使用JSON.stringify()来序列化
        if (window.JSON) {
            return JSON.stringify(obj);
        }
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj + '"';
            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);

            // fix.
            var self = arguments.callee;

            for (n in obj) {
                v = obj[n];
                t = typeof(v);
                if (obj.hasOwnProperty(n)) {
                    if (t == "string") v = '"' + v + '"'; else if (t == "object" && v !== null)
                    // v = jQuery.stringify(v);
                        v = self(v);
                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    },
}
