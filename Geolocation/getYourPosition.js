/**
 * Created by jzwmxz on 15-10-24.
 * P660
 * 通过获取地理位置信息在地图上显示当前位置
 * 返回：
 *      一个新创建的<img>元素，该元素用于在获取位置信息后，显示一张Google地图
 */
function getmap() {
    if (!navigator.geolocation) throw "Geolocation not supported";

    var image = document.createElement("img");
    navigator.geolocation.getCurrentPosition(setMapURL);
    return image;
}

//  回调函数
function setMapURL(pos) {
//    从参数对象中获取位置信息
    var latitude = pos.coords.latitude;   //  径度
    var longitude = pos.coords.longitude; //  纬度
    var accuracy = pos.coords.accuracy;   //  米

//    构造一个URL，用于请求一张显示当前位置信息的静态Google地图
    var url = "http://maps.google.com/maps/api/staticmap" +
        "?center=" + latitude + "." + longitude + "&size=640x640&sensor=true";

//    设置缩放级别
    var zoomlevel = 20;
    if (accuracy > 80) //  在低精度下进行放大
        zoomlevel -= Math.round(Math.log(accuracy / 50) / Math.LN2);
    url += "&zoom=" + zoomlevel;
    console.log(url);
    image.src = url;
}
