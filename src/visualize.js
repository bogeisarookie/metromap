//全局变量
var edges = []
    , vertex = []
    ;
var all_edges = [];
var all_vertex = [];
var vertex_unique = [];
//边集合，点集合
var E = [];
var V = [];
var color = ["#ED3229", "#36B854", "#FFD823", "#320176", "#823094", "#CF047A", "#F3560F", "#008CC1", "#91C5DB", "#C7AFD3", "#8C2222", "#007a61", "#ec91cc", "#32D2CA"];
function visualize_data(data) {
    //转换数据
    convert_data(data);
    console.log(edges);
    //绘制初始线路布局
    draw_line_by_lonlat(edges);
    //布局算法
    // metro_map_layout(edges);

}
function convert_data_to_EV(data) {

    all_vertex = $.extend(true, [], data);
    for (var i = 0; i < all_vertex.length; i++) {
        for (var j = i + 1; j < all_vertex.length; j++) {
            if (all_vertex[i].station == all_vertex[j].station) {
                all_vertex[i].line += "," + all_vertex[j].line;
                all_vertex.splice(j, 1);
                j--;
            }

        }

    }
    //遍历所有节点
    all_vertex.forEach(element => {
        element.neighborhood = [];
        var lines = element.line.split(",");
        var edges_copy=$.extend(true, [], edges);
        //遍历节点的所在线
        for (var i = 0; i < lines.length; i++) {
            //遍历所在线的站点
            if (parseInt(lines[i]) == 16) {
                lines[i] = 14;
            }
            edges[parseInt(lines[i]) - 1].children.forEach(station => {
                if (station.station == element.station) {

                    if (edges[parseInt(lines[i]) - 1].children[parseInt(station.line_id) - 2]) {
                        element.neighborhood.push(edges_copy[parseInt(lines[i]) - 1].children[parseInt(station.line_id) - 2]);
                    }
                    if (edges[parseInt(lines[i]) - 1].children[parseInt(station.line_id)]) {
                        element.neighborhood.push(edges_copy[parseInt(lines[i]) - 1].children[parseInt(station.line_id)]);
                    }
                    element.pixs_coor = map.latLngToLayerPoint([element.go_lat, element.go_lon]);
                    element.vector = vector2d(element.pixs_coor.x, element.pixs_coor.y);
                    // for(var i=0;i<element.neighborhood.length;i++){
                    //     for(var j=i+1;j<element.neighborhood.length;j++){
                    //         if(element.neighborhood[i].station==element.neighborhood[j].station){
                    //             element.neighborhood[i].line+=","+element.neighborhood[j].line;
                    //             element.neighborhood.splice(j,1);
                    //             j--;
                    //         }
                    //     }
                    // }

                }
            })

        }
    });
    console.log(all_vertex);
}

/**
 * 
 * 转换数据
 * 1.转成像素点坐标
 * 2.按边分类。每条边为一个对象，{边的id，边下面的节点V}
 * 3.每个节点也为一个对象，{属于的边id，第几个站，交点edges，以及邻接点V} 
 * @param {any} data 
 */
function convert_data(data) {
    var data_copy=$.extend(true, [], data);
    data_copy.forEach(element => {
        element.pixs_coor = map.latLngToLayerPoint([element.go_lat, element.go_lon]);
        var find = false;
        edges.every(edge => {
            //当前站点线路id是否与某条线路id相同，如果相同就加入该线路
            if (parseInt(element.line) == parseInt(edge.id)) {
                edge.children.push(element);
                //该元素找到相同得了，退出循环
                find = true;
                return false;
            } else {
                return true;
            }
        });
        //没找到说明还没有这个id的边，创建。
        if (find == false) {
            edges.push({
                id: element.line,
                children: [element]
            });
        }

    });
    //边排序，边内点排序
    edges.sort(function (a, b) { return parseInt(a.id) - parseInt(b.id); });
    edges.forEach(line => {
        line.children.sort(function (a, b) { return parseInt(a.line_id) - parseInt(b.line_id); });
    });


}
function draw_line_by_lonlat(edges) {

    edges.forEach(line => {
        if (line.id == 4) {
            //4号线为环线，需要首尾相连
            var line_pix = [];
            line.children.forEach(v => {
                line_pix.push([v.go_lat, v.go_lon]);
            });
            line_pix.push([line.children[0].go_lat, line.children[0].go_lon])
            var polyline = L.polyline(line_pix, { color: color[line.id - 1] }).addTo(map);
        }
        else if (line.id == 10) {
            // 由于10号线在龙溪路站(24)以后分为两条线路，需分两端绘制
            var line_1 = [];
            var line_2 = [];
            var line_3 = [];
            line_3.push([line.children[23].go_lat, line.children[23].go_lon])
            line.children.every(function (v) {
                if (v.line_id == 24) {
                    line_1.push([v.go_lat, v.go_lon]);
                    return false;
                } else {
                    line_1.push([v.go_lat, v.go_lon]);
                    return true;
                }

            });
            var polyline1 = L.polyline(line_1, { color: color[line.id - 1] }).addTo(map);
            //24-28上方路线
            for (var i = 23; i <= 27; i++) {
                line_2.push([line.children[i].go_lat, line.children[i].go_lon]);
            }
            var polyline2 = L.polyline(line_2, { color: color[line.id - 1] }).addTo(map);
            for (var i = 28; i < line.children.length; i++) {
                line_3.push([line.children[i].go_lat, line.children[i].go_lon]);
            }
            var polyline3 = L.polyline(line_3, { color: color[line.id - 1] }).addTo(map);
        }
        else if (line.id == 11) {
            //由于11号线在嘉定新城站(28)以后分为两条线路，需分两端绘制
            var line_1 = [];
            var line_2 = [];
            var line_3 = [];
            line_3.push([line.children[27].go_lat, line.children[27].go_lon])
            line.children.every(function (v) {
                if (v.line_id == 28) {
                    line_1.push([v.go_lat, v.go_lon]);
                    return false;
                } else {
                    line_1.push([v.go_lat, v.go_lon]);
                    return true;
                }

            });
            var polyline1 = L.polyline(line_1, { color: color[line.id - 1] }).addTo(map);
            //28-31上方路线
            for (var i = 27; i <= 30; i++) {
                line_2.push([line.children[i].go_lat, line.children[i].go_lon]);
            }
            var polyline2 = L.polyline(line_2, { color: color[line.id - 1] }).addTo(map);
            for (var i = 31; i < line.children.length; i++) {
                line_3.push([line.children[i].go_lat, line.children[i].go_lon]);
            }
            var polyline3 = L.polyline(line_3, { color: color[line.id - 1] }).addTo(map);
        }
        else {
            var line_pix = [];
            line.children.forEach(v => {
                line_pix.push([v.go_lat, v.go_lon]);
            });
            var polyline = L.polyline(line_pix, { color: color[line.id - 1] }).addTo(map);
        }

    });

}
