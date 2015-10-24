/**
 * Created by jzwmxz on 15-10-24.
 * P661
 * 使用所有地理位置特性
 */

//  异步获取我的位置，并在指定元素展示
function whereami(elt) {
//    将此对象作为第三个参数传递给getCurrentPosition()
    var options = {
        //  获取高精度的位置信息
        enableHighAccuracy: false,

        //    缓存
        maximumAge: 300000,  //  5分钟
        //    等待时间
        timeout: 15000   //  15秒内
    };

    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(success, error, options);
    else
        elt.innerHTML = "Geolocation not supported in this browser";

//    失败时调用
    function error(e) {
        elt.innerHTML = "Geolocation error" + e.code + ": " + e.message;
    }

//  成功时调用
    function success(pos) {
        var msg = "At " + new Date(pos.timestamp).toLocaleString() + " your were within" +
            pos.coords.accuracy + " meters of latitude" +
            pos.coords.latitude + " longitude" +
            pos.coords.longitude + ".";

        //    如果设备返回了海拔信息
        if (pos.coords.altitude) {
            msg += " You are " + pos.coords.altitude + " " + pos.coords.altitudeAccuracy + "meters above sea level.";
        }
        //    如果返回了速度和航道信息
        if (pos.coords.speed) {
            msg += " You are travelling at " + pos.coords.speed + "m/s on heading " + pos.coords.heading + ".";
        }
        elt.innerHTML = msg;
    }
}
