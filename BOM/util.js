//  ��ѯ���ڹ�����λ��
function getScrollOffsets(w) {
    //  ���Դ���iframe
    w = w || window;

    //  ��<IE8����
    if (w.pageXOffset != null) return {x: w.pageXOffset, y: w.pageYOffset};

    //  ��׼ģʽ�µ�IE�����κ��������
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
        return {x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop};

    //  ����ģʽ�µ������
    return {x: d.body.scrollLeft, y: d.body.scrollTop};
}

//  ��ѯ�����ӿڳߴ�
function getViewportSize(w) {
    w = w || window;

    //  ��IE8������汾����������
    if (w.innerWidth) return {w: w.innerWidth, h: w.innerHeight};

    //  �Ա�׼ģʽ�µ�IE�����κ��������
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
        return {w: d.documentElement.clientWidth, h: d.documentElement.clientHeight};

    //  ����ģʽ�µ������
    return {w: d.body.clientWidth, h: d.body.clientHeight};
}

//  ��ѯԪ���ӿ�λ��,����ͬgetBoundingClientRect()
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

//  ��ѯԪ���ĵ�λ��
function getDocPos(e) {
    var viewPos = e.getBoundingClientRect();
    var offsets = getScrollOffsets();
    return {x: viewPos.left + offsets.x, y: viewPos.top + offsets.y};
}

//  ��ѯURL����
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

//  �����л�
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