//  查询窗口滚动条位置
function getScrollOffsets(w) {
    //  可以传入iframe
    w = w || window;

    //  除<IE8以外
    if (w.pageXOffset != null) return {x: w.pageXOffset, y: w.pageYOffset};

    //  标准模式下的IE（或任何浏览器）
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
        return {x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop};

    //  怪异模式下的浏览器
    return {x: d.body.scrollLeft, y: d.body.scrollTop};
}

//  查询窗口视口尺寸
function getViewportSize(w) {
    w = w || window;

    //  除IE8及更早版本以外的浏览器
    if (w.innerWidth) return {w: w.innerWidth, h: w.innerHeight};

    //  对标准模式下的IE（或任何浏览器）
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
        return {w: d.documentElement.clientWidth, h: d.documentElement.clientHeight};

    //  怪异模式下的浏览器
    return {w: d.body.clientWidth, h: d.body.clientHeight};
}

//  查询元素视口位置,作用同getBoundingClientRect()
function getViewPos(elt) {
    var x = 0, y = 0;
    for (var e = elt; e != null; e = e.offsetParent) {
        x += e.offsetLeft;
        y += e.offsetTop;
    }

    for (var e = elt.parentNode; e != null && e.nodeType == 1; e = e.parentNode) {
        x -= e.scrollLeft;
        y -= e.scrollTop;
    }
    return {x: x, y: y};
}

//  查询元素文档位置
function getDocPos(e) {
    var viewPos = e.getBoundingClientRect();
    var offsets = getScrollOffsets();
    return {x: viewPos.left + offsets.x, y: viewPos.top + offsets.y};
}

//  查询URL参数
function getQueryStringArgs() {
    var qs = location.search.length > 0 ? location.search.substring(1) : "";

    var args = {};
    var items = qs.split("&");
    var name, value;

    items.forEach(function (item) {
        item = item.split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        args[name] = value;
    });
    return args;
}

//  表单序列化
function serialize(form) {
    var parts = [];

    [].slice.call(form.elements).forEach(function (filed) {
        switch (filed.type) {
            case "select-one":
            case "select-multiple":
                [].slice.call(filed.options).forEach(function (option) {
                    if (option.selected) {
                        var value = "";
                        if (option.hasAttribute) {
                            value = (option.hasAttribute("value") ? option.value : option.text);
                        } else {  //  IE
                            value = (option.attributes["value"].specified ? option.value : option.text);
                        }
                        parts.push(encodeURIComponent(filed.name) + "=" + encodeURIComponent(value));
                    }
                });
                break;

            case undefined:
            case "file":
            case "submit":
            case "reset":
            case "button":
                break;

            case "radio":
            case "checkbox":
                if (!filed.checked) {
                    break;
                }
            default :
                parts.push(encodeURIComponent(filed.name) + "=" + encodeURIComponent(filed.value));
        }
    });
    return parts.join("&");
}