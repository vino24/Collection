//  获取到页面中所有特定类型的input(eg:checkbox、text and so on)
function getInputList(type) {
    var domList = document.getElementsByTagName("input");
    var result = [];
    [].slice.call(domList).forEach(function (item) {
        if (item.type == type) {
            result.push(item);
        }
    });
    return result;
}

//  防XSS过滤函数
function escapeHtml(str) {
    return str.replace(/[<>&"]/g, function (match) {
        switch (match) {
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case "\"":
                return "&quot;";
        }
    });
}