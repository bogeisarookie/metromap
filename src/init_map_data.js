

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
    
     var map = L.map("map", {
        center: [31.2328920509,121.4744959111],
        zoom: 12,
         layers: [normalm4],
        zoomControl: false
    });
    
    L.control.layers(baseLayers_1, null).addTo(map);
    L.control.zoom({
        zoomInTitle: '放大',
        zoomOutTitle: '缩小'
    }).addTo(map);
    d3.csv("./data/stations.csv",function(error,data){
        if(error){
            console.log(error);
        }
        //数据说明：line代表属于哪条线路，line_id代表属于该条线路的第几个站，从1开始。
        console.log(data);

        visualize_data(data);
        convert_data_to_EV(data);
    });
    // location.reload();
    //修改标题
    

