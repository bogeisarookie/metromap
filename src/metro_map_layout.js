/**
 * 地铁线路布局算法
 * 传入所有边节点
 * 数据:all_vertex代表所有包含邻居节点的点
 * all_edges代表包含邻居节电的所有两个节点组成的边
 * edges;代表14条地铁线路
 * 构想的步骤：
 * 1.设置一个阈值，将只有两个邻居节点的节点计算与邻居节点vjvk的距离，如果小于阈值说明差别不大直接删除该节点。
 * 2.得到精简后的线路布局之后，遍历每个节点，加入标准约束
 * @param {any} edges 
 */
function metro_map_layout(all_vertex, all_edges) {
    var map_length = 50;
    edges.forEach(edge => {
        edge.children.forEach(node => {
            if (node.neighborhood, length == 2) {

            }
        });
    });

}


var color = ["#ED3229", "#36B854", "#FFD823", "#320176", "#823094", "#CF047A", "#F3560F", "#008CC1", "#91C5DB", "#C7AFD3", "#8C2222", "#007a61", "#ec91cc", "#32D2CA", "#ED3229", "#36B854", "#FFD823", "#320176", "#823094", "#CF047A", "#F3560F", "#008CC1", "#91C5DB", "#C7AFD3", "#8C2222", "#007a61", "#ec91cc", "#32D2CA", "#ED3229", "#36B854", "#FFD823", "#320176", "#823094", "#CF047A", "#F3560F", "#008CC1", "#91C5DB", "#C7AFD3", "#8C2222", "#007a61", "#ec91cc", "#32D2CA", "#ED3229", "#36B854", "#FFD823", "#320176", "#823094", "#CF047A", "#F3560F", "#008CC1", "#91C5DB", "#C7AFD3", "#8C2222", "#007a61", "#ec91cc", "#32D2CA", "#ED3229", "#36B854", "#FFD823", "#320176", "#823094", "#CF047A", "#F3560F", "#008CC1", "#91C5DB", "#C7AFD3", "#8C2222", "#007a61", "#ec91cc", "#32D2CA", "#ED3229", "#36B854", "#FFD823", "#320176", "#823094", "#CF047A", "#F3560F", "#008CC1", "#91C5DB", "#C7AFD3", "#8C2222", "#007a61", "#ec91cc", "#32D2CA"];




var normalm1 = L.tileLayer.chinaProvider('Geoq.Normal.Map', {
    maxZoom: 18,
    minZoom: 5
});
var normalm2 = L.tileLayer.chinaProvider('Geoq.Normal.Color', {
    maxZoom: 18,
    minZoom: 5
});
var normalm3 = L.tileLayer.chinaProvider('Geoq.Normal.PurplishBlue', {
    maxZoom: 18,
    minZoom: 5
});
var normalm4 = L.tileLayer.chinaProvider('Geoq.Normal.Gray', {
    maxZoom: 18,
    minZoom: 5
});
var normalm5 = L.tileLayer.chinaProvider('Geoq.Normal.Warm', {
    maxZoom: 18,
    minZoom: 5
});
var normalm6 = L.tileLayer.chinaProvider('Geoq.Normal.Cold', {
    maxZoom: 18,
    minZoom: 5
});

var normal = L.layerGroup([normalm1, normalm2, normalm3, normalm4, normalm5, normalm6]);

var baseLayers_1 = {
    "地图": normalm1,
    "多彩": normalm2,
    "午夜蓝": normalm3,
    "灰色": normalm4,
    "暖色": normalm5,
    "冷色": normalm6
}

var map_layout = L.map("map_layout", {
    center: [31.27107, 121.42467],
    zoom: 12,
    layers: [normalm4],
    zoomControl: false

});

L.control.layers(baseLayers_1, null).addTo(map_layout);
L.control.zoom({
    zoomInTitle: '放大',
    zoomOutTitle: '缩小'
}).addTo(map_layout);
// map_layout.on("zoomend moveend ", function (e) {
//     console.log("当前层级和中心点" + map_layout.getZoom() + "中心点" + map_layout.getCenter());
//     console.log("点击了！坐标点为"+e.latlng);

// })
var playbackOptions = {
    playControl: true,
    dateControl: true,
    sliderControl: true,
    tracksLayer: false
};
var playback = new L.Playback(map_layout, demoTracks, null, playbackOptions);
map_layout.on("click", function (e) {

    console.log("点击了！坐标点为" + e.latlng);

});
var stations = [[31.37005, 121.39446], [31.32901, 121.35464], [31.27562, 121.41575], [31.23453, 121.3361], [31.21574, 121.47686], [31.2721, 121.48716], [31.30672, 121.53042], [31.31317, 121.60595], [31.25155, 121.57436], [31.17051, 121.50639], [31.33604, 121.46012]];
var markerLatlngs = [[31.24898, 121.42455], [31.24693, 121.41588], [31.24363, 121.40189], [31.23467, 121.38961],
[31.22154, 121.39313],
[31.23056, 121.40961],
[31.23614, 121.42154],
[31.24069, 121.43536],
[31.24744, 121.44042]];





var simple_data;
try {
    simple_data = JSON.parse(document.getElementById("jsonInputField_output4").value);
} catch (e) { }
var markLayer_1 = L.marker(stations[0], { icon: L.AwesomeMarkers.icon({ icon: 'flash', prefix: 'fa', markerColor: 'orange' }) }).bindPopup("<p style='color:green;text-align:center'>低负荷警告！<br/></p><p>上海市<br/>实时负载：80%</p>", { autoClose: false }).addTo(map_layout);
L.circle(stations[0], {radius: 2000,color:'orange'}).addTo(map_layout);
var markLayer_2 = L.marker(stations[1], { icon: L.AwesomeMarkers.icon({ icon: 'flash', prefix: 'fa', markerColor: 'green' }) }).bindPopup('<p>用户编号：2<br/>实时负载：10%</p>', { autoClose: false }).addTo(map_layout);
L.circle(stations[1], {radius: 1000,color:'green'}).addTo(map_layout);
var markLayer_3 = L.marker(stations[2], { icon: L.AwesomeMarkers.icon({ icon: 'flash', prefix: 'fa', markerColor: 'orange' }) }).bindPopup('<p>用户编号：1<br/>实时负载：80%<br/>附属线路编号：9</p>', { autoClose: false }).addTo(map_layout);
L.circle(stations[2], {radius: 500,color:'orange'}).addTo(map_layout);
var markLayer_4 = L.marker(stations[3], { icon: L.AwesomeMarkers.icon({ icon: 'warning', prefix: 'fa', markerColor: 'green' }) }).bindPopup("<p style='color:green;text-align:center'>低负荷警告！<br/></p><p>上海市3号变电站<br/>实时负载：20%<br/>电压等级：220KV<br/>合同容量：35MW</p>", { autoClose: false }).addTo(map_layout);
L.circle(stations[3], {radius: 1500,color:'green'}).addTo(map_layout);
var markLayer_5 = L.marker(stations[4], { icon: L.AwesomeMarkers.icon({ icon: 'flash', prefix: 'fa', markerColor: 'orange' }) }).bindPopup('<p>用户编号：1<br/>实时负载：80%<br/>附属线路编号：9</p>', { autoClose: false }).addTo(map_layout);
L.circle(stations[4], {radius: 1500,color:'orange'}).addTo(map_layout);
var markLayer_6 = L.marker(stations[5], { icon: L.AwesomeMarkers.icon({ icon: 'flash', prefix: 'fa', markerColor: 'orange' }) }).bindPopup('<p>用户编号：1<br/>实时负载：80%<br/>附属线路编号：9</p>', { autoClose: false }).addTo(map_layout);
L.circle(stations[5], {radius: 500,color:'orange'}).addTo(map_layout);
var markLayer_7 = L.marker(stations[6], { icon: L.AwesomeMarkers.icon({ icon: 'flash', prefix: 'fa', markerColor: 'orange' }) }).bindPopup('<p>用户编号：1<br/>实时负载：80%<br/>附属线路编号：9</p>', { autoClose: false }).addTo(map_layout);
L.circle(stations[6], {radius: 2000,color:'orange'}).addTo(map_layout);
var markLayer_8 = L.marker(stations[7], { icon: L.AwesomeMarkers.icon({ icon: 'flash', prefix: 'fa', markerColor: 'orange' }) }).bindPopup('<p>用户编号：1<br/>实时负载：80%<br/>附属线路编号：9</p>', { autoClose: false }).addTo(map_layout);
L.circle(stations[7], {radius: 2500,color:'orange'}).addTo(map_layout);
var markLayer_9 = L.marker(stations[8], { icon: L.AwesomeMarkers.icon({ icon: 'flash', prefix: 'fa', markerColor: 'orange' }) }).bindPopup('<p>用户编号：1<br/>实时负载：80%<br/>附属线路编号：9</p>', { autoClose: false }).addTo(map_layout);
L.circle(stations[8], {radius: 1000,color:'orange'}).addTo(map_layout);
var markLayer_10 = L.marker(stations[9], { icon: L.AwesomeMarkers.icon({ icon: 'flash', prefix: 'fa', markerColor: 'orange' }) }).bindPopup('<p>用户编号：1<br/>实时负载：80%<br/>附属线路编号：9</p>', { autoClose: false }).addTo(map_layout);
L.circle(stations[9], {radius: 1000,color:'orange'}).addTo(map_layout);
var markLayer_11 = L.marker(stations[10], { icon: L.AwesomeMarkers.icon({ icon: 'warning', prefix: 'fa', markerColor: 'red' }) }).bindPopup("<p style='color:red;text-align:center'>超负荷警告！<br/></p><p>上海市1号变电站<br/>实时负载：80%<br/>电压等级：220KV<br/>合同容量：40MW</p>", { autoClose: false }).addTo(map_layout);
L.circle(stations[10], {radius: 2000,color:'red'}).addTo(map_layout);
markLayer_4.openPopup();
markLayer_11.openPopup();
markLayer_11.on("click", function (e) {
    markLayer_1.remove();
    markLayer_2.remove();
    markLayer_3.remove();
    markLayer_4.remove();
    markLayer_5.remove();
    markLayer_6.remove();
    markLayer_7.remove();
    markLayer_8.remove();
    markLayer_9.remove();
    markLayer_10.remove();
    markLayer_11.remove();
    draw_metro_ayout_map(simple_data);
    map_layout.setView([31.24651, 121.46224], 15);
});
function draw_metro_ayout_map(data) {
    var draw_output_data = data.children_out;
    var draw_input_data = data.children_in;
    // var point = L.point(560.457076366832, 940 -760.679187051409);
    // var point_after_convert = map_layout.containerPointToLayerPoint(point);
    var station_layer = L.marker([31.24651, 121.46224]).bindPopup('<p>上海市1号变电站</p>').addTo(map_layout);
    draw_output_data.forEach(function (element) {
        // if(element.id!=10){
        var line = {
            id: element.id,
            xy: [],
            percent: element.percent
        }
        var x = element.x.split(",");
        var y = element.y.split(",");
        for (let i = 0; i < x.length; i++) {
            var point = L.point(parseFloat(x[i]), 1280 - parseFloat(y[i]));
            var point_after_convert = map_layout.containerPointToLayerPoint(point);
            L.circle([map_layout.layerPointToLatLng(point_after_convert).lat, map_layout.layerPointToLatLng(point_after_convert).lng], { radius: 20, color: "black" }).addTo(map_layout);
            line.xy.push([map_layout.layerPointToLatLng(point_after_convert).lat, map_layout.layerPointToLatLng(point_after_convert).lng]);
        }
        var polyline = L.polyline(line.xy, { color: getColorByBaiFenBi(line.percent), opacity: 1, weight: 5, className: line.id.toString() }).addTo(map_layout);
        // var polyline = L.polyline(line.xy, { color: "black", opacity: 1 ,className:line.id.toString()}).addTo(map_layout);
        polyline.bindTooltip('<p>线路编号：' + line.id + '<br />' + '实时负载：' + line.percent + '%' + '<br />' + '下属用户数量：6' + '</p>', { direction: "left", offset: L.point(-20, -5) });

        polyline.on("mouseover", function (e) {
            this.openTooltip();
            console.log(e);
            console.log(this);
        });
        polyline.on("click", function (e) {
            console.log("当前层级和中心点" + map_layout.getZoom() + "中心点" + map_layout.getCenter());
            map_layout.setView(e.latlng, 15);
            var markLayer1 = L.marker(markerLatlngs[0], { icon: L.AwesomeMarkers.icon({ icon: 'user', prefix: 'fa', markerColor: 'red' }) }).bindPopup('<p>用户编号：1<br/>实时负载：80%<br/>附属线路编号：9</p>', { autoClose: false }).addTo(map_layout);
            var markLayer2 = L.marker(markerLatlngs[1], { icon: L.AwesomeMarkers.icon({ icon: 'battery-quarter', prefix: 'fa', markerColor: 'green' }) }).bindPopup('<p>用户编号：2<br/>实时负载：10%<br/>附属线路编号：9</p>', { autoClose: false }).addTo(map_layout);
            var markLaye3 = L.marker(markerLatlngs[2], { icon: L.AwesomeMarkers.icon({ icon: 'user', prefix: 'fa', markerColor: 'orange' }) }).bindPopup('<p>用户编号：3<br/>实时负载：80%<br/>附属线路编号：9</p>', { autoClose: false }).addTo(map_layout);
            var markLayer4 = L.marker(markerLatlngs[3], { icon: L.AwesomeMarkers.icon({ icon: 'upload', prefix: 'fa', markerColor: 'green' }) }).bindPopup('<p>用户编号：4<br/>上送电量：800瓦<br/>附属线路编号：9</p>', { autoClose: false }).addTo(map_layout);
            var markLayer5 = L.marker(markerLatlngs[4], { icon: L.AwesomeMarkers.icon({ icon: 'user', prefix: 'fa', markerColor: 'orange' }) }).bindPopup('<p>用户编号：5<br/>实时负载：80%<br/>附属线路编号：9</p>', { autoClose: false }).addTo(map_layout);
            var markLayer6 = L.marker(markerLatlngs[5], { icon: L.AwesomeMarkers.icon({ icon: 'user', prefix: 'fa', markerColor: 'orange' }) }).bindPopup('<p>用户编号：6<br/>实时负载：80%<br/>附属线路编号：9</p>', { autoClose: false }).addTo(map_layout);
            var markLayer7 = L.marker(markerLatlngs[6], { icon: L.AwesomeMarkers.icon({ icon: 'user', prefix: 'fa', markerColor: 'orange' }) }).bindPopup('<p>用户编号：7<br/>实时负载：80%<br/>附属线路编号：9</p>', { autoClose: false }).addTo(map_layout);
            var markLayer8 = L.marker(markerLatlngs[7], { icon: L.AwesomeMarkers.icon({ icon: 'user', prefix: 'fa', markerColor: 'orange' }) }).bindPopup('<p>用户编号：8<br/>实时负载：80%<br/>附属线路编号：9</p>', { autoClose: false }).addTo(map_layout);
            var markLayer9 = L.marker(markerLatlngs[8], { icon: L.AwesomeMarkers.icon({ icon: 'battery-quarter', prefix: 'fa', markerColor: 'green' }) }).bindPopup('<p>用户编号：9<br/>实时负载：20%<br/>附属线路编号：9</p>', { autoClose: false }).addTo(map_layout);
            markLayer1.openPopup();
            markLayer2.openPopup();
            markLayer4.openPopup();
            markLayer9.openPopup();
            station_layer.remove();



        });
        // }

    });
    draw_input_data.forEach(function (element) {
        var line = {
            id: element.id,
            xy: []
        }
        var x = element.x.split(",");
        var y = element.y.split(",");
        for (let i = 0; i < x.length; i++) {
            var point = L.point(parseFloat(x[i]), 1280 - parseFloat(y[i]));
            var point_after_convert = map_layout.containerPointToLayerPoint(point);
            L.circle([map_layout.layerPointToLatLng(point_after_convert).lat, map_layout.layerPointToLatLng(point_after_convert).lng], { radius: 20, color: color[line.id - 1] }).addTo(map_layout);
            line.xy.push([map_layout.layerPointToLatLng(point_after_convert).lat, map_layout.layerPointToLatLng(point_after_convert).lng]);
        }
        var polyline = L.polyline(line.xy, { color: color[line.id - 1] }).addTo(map_layout);
    });
}

function getColorByBaiFenBi(bili) {
    //var 百分之一 = (单色值范围) / 50;  单颜色的变化范围只在50%之内  
    var one = (255 + 255) / 100;
    var r = 0;
    var g = 0;
    var b = 0;

    if (bili < 50) {
        // 比例小于50的时候红色是越来越多的,直到红色为255时(红+绿)变为黄色.  
        r = one * bili;
        g = 255;
    }
    if (bili >= 50) {
        // 比例大于50的时候绿色是越来越少的,直到0 变为纯红  
        g = 255 - ((bili - 50) * one);
        r = 255;
    }
    r = parseInt(r);// 取整  
    g = parseInt(g);// 取整  
    b = parseInt(b);// 取整  

    //console.log("#"+r.toString(16,2)+g.toString(16,2)+b.toString(16,2));  
    //return "#"+r.toString(16,2)+g.toString(16,2)+b.toString(16,2);  
    //console.log("rgb("+r+","+g+","+b+")" );  
    return "rgb(" + r + "," + g + "," + b + ")";

}
function onPlaybackTimeChange() { }

// location.reload();
//修改标题


