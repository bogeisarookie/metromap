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
            if(node.neighborhood,length==2){
                
            }
        });
    });

}