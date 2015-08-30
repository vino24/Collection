//  ��ȡ��ҳ���������ض����͵�input(eg:checkbox��text and so on)
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

//  ��XSS���˺���
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