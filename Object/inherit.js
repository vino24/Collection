//  ͨ��ԭ�ͼ̳д���һ���¶���
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

//  �������ʽ�̳�
function inheritPrototype(subType, superType) {
    var prototype = inherit(superType.prototype);   //  ��������
    prototype.constructor = subType;    //  ��ǿ����
    subType.prototype = prototype;  //  ָ������
}