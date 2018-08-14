//全局变量
var edges = []
    , vertex = []
    ;
var all_edges = [];
var all_vertex = [];
var vertex_unique = [];
var lines = [];
var vertex_angle=[];
var all_x=[];
var all_y=[];
var all_x_string="";
var all_y_string="";
var angle_string={content:""};
var chongfu=[];
var all_lines_string="";
//边集合，点集合
var E = [];
var V = [];
var color = ["#ED3229", "#36B854", "#FFD823", "#320176", "#823094", "#CF047A", "#F3560F", "#008CC1", "#91C5DB", "#C7AFD3", "#8C2222", "#007a61", "#ec91cc", "#32D2CA"];
function visualize_data(data) {
    //转换数据
    convert_data(data);
    //console.log(edges);
    //绘制初始线路布局
    draw_line_by_lonlat(edges);
    //布局算法
    metro_map_layout(all_vertex, all_edges);
}
/**
 * 将数据转换成论文复现需要的格式
 * 1.V：节点集合，其中节点内容{邻居节点、向量表示、属于哪些线段}
 * 2.E：边结合，其中边内容{edges(vector,vector)、邻居节点、属于哪个线段}
 * @param {any} data 
 */
function convert_data_to_EV(data) {
    //深度拷贝数组，防止污染。
    // all_vertex = $.extend(true, [], data);
    all_vertex = data;
    for (var i = 0; i < all_vertex.length; i++) {
        for (var j = i + 1; j < all_vertex.length; j++) {
            if (all_vertex[i].station == all_vertex[j].station) {
                if(all_vertex[i].line !=all_vertex[j].line){
                    all_vertex[i].line += "," + all_vertex[j].line;
                }            
                all_vertex.splice(j, 1);
                j--;
            }

        }

    }
    //遍历所有节点
    all_vertex.forEach(element => {
        element.neighborhood = [];
        var lines = element.line.split(",");
        var edges_copy = $.extend(true, [], edges);
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
                    element.vector = new Point(element.pixs_coor.x, element.pixs_coor.y);
                    //这里删除多余的重复邻居节点，但是要保存多余的节点的附属线路id
                    //之前的bug 是因为这里pq还用了i 跟最外层重复了，报错。
                    for (var p = 0; p < element.neighborhood.length; p++) {
                        for (var q = p + 1; q < element.neighborhood.length; q++) {
                            if (element.neighborhood[p].station == element.neighborhood[q].station) {
                                element.neighborhood[p].line += "," + element.neighborhood[q].line;
                                element.neighborhood.splice(q, 1);
                                q--;
                            }
                        }
                    }

                }
            });

        }
    });
    //给所有顶点编上号
    all_vertex.forEach(function (vertex, index) {
        vertex.id = index + 1;
    });
    //对于要处理的数据来说，计算每个点的邻居节点如果》=3 处理
    all_vertex.forEach(function (vertex) {
        vertex.matlab = [];
        if (vertex.neighborhood.length >= 3) {
            for (let i = 0; i < vertex.neighborhood.length; i++) {
                vertex.neighborhood.sort(function (a, b) { return getAngle(a, vertex) - getAngle(b, vertex); });
            }

            for (let i = 0; i < vertex.neighborhood.length - 1; i++) {
                vertex.matlab.push("[" + vertex.id + "," + find_station_id(vertex.neighborhood[i].station)[0].id + "," + find_station_id(vertex.neighborhood[i + 1].station)[0].id +","+vertex.neighborhood.length+"]");
            }
            vertex.matlab.push("[" + vertex.id + "," + find_station_id(vertex.neighborhood[vertex.neighborhood.length - 1].station)[0].id + "," + find_station_id(vertex.neighborhood[0].station)[0].id +","+vertex.neighborhood.length+ "]");


        }
    });

    vertex_angle=all_vertex.filter(function(vertex){
        return vertex.matlab.length>2;
    })
    all_vertex.forEach(function(vertex){
        all_x.push(vertex.pixs_coor.x);
        //上海地铁线路
        // all_y.push(1920-vertex.pixs_coor.y);
        all_y.push(1980-vertex.pixs_coor.y);
    });
    all_x_string=all_x.join(" ");
    all_y_string=all_y.join(" ");
    //所有节点，包括邻居节点和本身的向量
    console.log("深度拷贝原数据，每个节点，加入了邻居节点，且删除重复的节点记录线路id")
    console.log(all_vertex);
    console.log("所有x");
    console.log(all_x_string);
    console.log("所有y");
    console.log(all_y_string);
    console.log("所有大于2个邻居节点的点的所有边");
    console.log(vertex_angle);
    vertex_angle.forEach(function(vertex){
        vertex.matlab.forEach(function(angel){
            angle_string.content+="angle2("+angel+")+";
        })
         
    });
    console.log("所有角度条件的边");
    console.log(angle_string);
    all_vertex.forEach(function (vertex) {
        vertex.neighborhood.forEach(function(n){
            if(vertex.station==n.station){
                chongfu.push({
                    id:vertex.id
                })
            }
        });
    });
    console.log("有问题的点id");
    console.log(chongfu);

    edges.forEach(function (edge) {
        edge.children.forEach(function (node, index) {
            var i;
            var j;
            if ((index + 1) != edge.children.length) {
                all_vertex.every(function (vertex_node) {
                    if (vertex_node.station == node.station) {
                        i = vertex_node;
                        all_vertex.every(vertex_node => {
                            if (vertex_node.station == edge.children[index + 1].station) {
                                j = vertex_node;
                                return false;
                            }
                            else { return true; }
                        });
                        return false;
                    }
                    else { return true; }
                });

                all_edges.push({
                    i: i,
                    j: j
                });
            }



        });
    });
    console.log("边集合");
    console.log(all_edges);
    console.log("每条地铁线路集合");
    console.log(edges);

    edges.forEach(function (edge) {
        var line = {
            id: edge.id,
            matlab_line_x:"",
            matlab_line_y:"",
            x: [],
            y: []
        }
        edge.children.forEach(function (station) {
            line.x.push(station.pixs_coor.x);
            line.y.push(1080-sstation.pixs_coor.y);
                line.matlab_line_x+="Vx"+"("+find_station_id(station.station)[0].id+")"+" ";
                line.matlab_line_y+="Vy"+"("+find_station_id(station.station)[0].id+")"+" ";
        });
        lines.push(line);
    });
    lines.forEach(function (element) {
        element.x = element.x.join(" ");
        element.y = element.y.join(" ");

    });
    console.log("MATLAB格式线路数据");
    console.log(lines);

    lines.forEach(function (edge) {
        all_lines_string+="Line"+edge.id+"="+"["+edge.matlab_line_x+";"+edge.matlab_line_y+"]"+";"+"\n";
    });
    console.log(all_lines_string);
}


/**
 * 
 * 转换数据
 * 1.转成像素点坐标
 * 2.绘制线路
 * @param {any} data 
 */
function convert_data(data) {
    // var data_copy = $.extend(true, [], data);
    var data_copy = data;
    data_copy.forEach(element => {
        //原来上海地铁线路数据格式
        // element.pixs_coor = map.latLngToLayerPoint([element.go_lat, element.go_lon]);
        var x=parseFloat(element.pix_x);
        var y=parseFloat(element.pix_y)+150;
        var point=L.point(x,y);
        var point_after_convert= map.containerPointToLayerPoint(point);
        element.go_lat=map.layerPointToLatLng(point_after_convert).lat;
        element.go_lon=map.layerPointToLatLng(point_after_convert).lng;
        element.pixs_coor=point;


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
function find_station_id(station) {
    return all_vertex.filter(function (vertex) {
        return vertex.station == station;
    });
}
function calcu_distance(v1, v2) {
    calX = v1.pixs_coor.x - v2.pixs_coor.x;
    calY = v1.pixs_coor.y - v2.pixs_coor.y;
    return Math.pow((calX * calX + calY * calY), 0.5);
}
function draw_line_by_lonlat(edges) {

    edges.forEach(line => {
        // if (line.id == 4) {
        //     //4号线为环线，需要首尾相连
        //     var line_pix = [];
        //     line.children.forEach(v => {
        //         line_pix.push([v.go_lat, v.go_lon]);
        //     });
        //     line_pix.push([line.children[0].go_lat, line.children[0].go_lon])
        //     var polyline = L.polyline(line_pix, { color: color[line.id - 1] }).addTo(map);
        // }
        // else if (line.id == 10) {
        //     // 由于10号线在龙溪路站(24)以后分为两条线路，需分两端绘制
        //     // var line_1 = [];
        //     // var line_2 = [];
        //     // var line_3 = [];
        //     // line_3.push([line.children[23].go_lat, line.children[23].go_lon])
        //     // line.children.every(function (v) {
        //     //     if (v.line_id == 24) {
        //     //         line_1.push([v.go_lat, v.go_lon]);
        //     //         return false;
        //     //     } else {
        //     //         line_1.push([v.go_lat, v.go_lon]);
        //     //         return true;
        //     //     }

        //     // });
        //     // var polyline1 = L.polyline(line_1, { color: color[line.id - 1] }).addTo(map);
        //     // //24-28上方路线
        //     // for (var i = 23; i <= 27; i++) {
        //     //     line_2.push([line.children[i].go_lat, line.children[i].go_lon]);
        //     // }
        //     // var polyline2 = L.polyline(line_2, { color: color[line.id - 1] }).addTo(map);
        //     // for (var i = 28; i < line.children.length; i++) {
        //     //     line_3.push([line.children[i].go_lat, line.children[i].go_lon]);
        //     // }
        //     // var polyline3 = L.polyline(line_3, { color: color[line.id - 1] }).addTo(map);
        // }
        // else if (line.id == 11) {
        //     //由于11号线在嘉定新城站(28)以后分为两条线路，需分两端绘制
        //     // var line_1 = [];
        //     // var line_2 = [];
        //     // var line_3 = [];
        //     // line_3.push([line.children[27].go_lat, line.children[27].go_lon])
        //     // line.children.every(function (v) {
        //     //     if (v.line_id == 28) {
        //     //         line_1.push([v.go_lat, v.go_lon]);
        //     //         return false;
        //     //     } else {
        //     //         line_1.push([v.go_lat, v.go_lon]);
        //     //         return true;
        //     //     }

        //     // });
        //     // var polyline1 = L.polyline(line_1, { color: color[line.id - 1] }).addTo(map);
        //     // //28-31上方路线
        //     // for (var i = 27; i <= 30; i++) {
        //     //     line_2.push([line.children[i].go_lat, line.children[i].go_lon]);
        //     // }
        //     // var polyline2 = L.polyline(line_2, { color: color[line.id - 1] }).addTo(map);
        //     // for (var i = 31; i < line.children.length; i++) {
        //     //     line_3.push([line.children[i].go_lat, line.children[i].go_lon]);
        //     // }
        //     // var polyline3 = L.polyline(line_3, { color: color[line.id - 1] }).addTo(map);
        // }
        // else {
        //     var line_pix = [];
        //     line.children.forEach(v => {
        //         line_pix.push([v.go_lat, v.go_lon]);
        //     });
        //     var polyline = L.polyline(line_pix, { color: color[line.id - 1] }).addTo(map);
        // }
        var line_pix = [];
        line.children.forEach(v => {
            line_pix.push([v.go_lat, v.go_lon]);
        });
        var polyline = L.polyline(line_pix, { color:"black" }).addTo(map);

    });

}
function getAngle(a, b) {//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
    var px = a.pixs_coor.x;
    var py = a.pixs_coor.y;
    var mx = b.pixs_coor.x;
    var my = b.pixs_coor.y;
    var x = Math.abs(px - mx);
    var y = Math.abs(py - my);
    var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var cos = y / z;
    var radina = Math.acos(cos);//用反三角函数求弧度
    var angle = Math.floor(180 / (Math.PI / radina));//将弧度转换成角度

    if (mx > px && my > py) {//鼠标在第四象限
        angle = 180 - angle;
    }

    if (mx == px && my > py) {//鼠标在y轴负方向上
        angle = 180;
    }

    if (mx > px && my == py) {//鼠标在x轴正方向上
        angle = 90;
    }

    if (mx < px && my > py) {//鼠标在第三象限
        angle = 180 + angle;
    }

    if (mx < px && my == py) {//鼠标在x轴负方向
        angle = 270;
    }

    if (mx < px && my < py) {//鼠标在第二象限
        angle = 360 - angle;
    }



    return angle;
}



