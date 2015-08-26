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