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

//  ����querySelect()�ĺ���,��֧��ID��class��tagѡ����

function query(selector) {
    var reg = selector.match(/^(#)?(\.)?(\w+)$/);
    var result = [];
    if (reg[3]) {
        //  idѡ����
        if (reg[1] && !reg[2]) {
            result.push(document.getElementById(reg[3]));
        } else if (reg[2] && !reg[1]) {
            var classes = document.getElementsByClassName(reg[3]);
            [].slice.call(classes).forEach(function (i) {
                result.push(i);
            });
        } else if (!reg[1] && !reg[2]) {
            var tags = document.getElementsByTagName(reg[3]);
            [].slice.call(tags).forEach(function (j) {
                result.push(j);
            });
        }
    }
    return result;
}