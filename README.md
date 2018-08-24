# metromap
打算使用多标准约束算法结合leaflet进行电力线路布局优化展示<br>
## 步骤
1. 自己手工模拟数据，数据坐标点信息为屏幕像素点坐标，然后将其输入到matlab中。
2. 使用matlab中的优化工具箱，对输入的原始数据采用制定好的多标准约束进行最小值求解。
3. 将求得的结果复制到前端页面中进行可视化。
4. 可视化地理信息采用leaflet.js进行地理位置映射，同时用颜色映射线路负载信息。
## 初始布局图
![before](https://github.com/bogeisarookie/metromap/blob/master/picture/%E6%A1%88%E4%BE%8B%E5%88%86%E6%9E%90%E5%88%9D%E5%A7%8B%E5%B8%83%E5%B1%80.png)
## 优化后布局图
![after](https://github.com/bogeisarookie/metromap/blob/master/picture/%E6%A1%88%E4%BE%8B%E5%88%86%E6%9E%90%E4%BC%98%E5%8C%96%E5%90%8E%E5%B8%83%E5%B1%80%E5%9B%BE.png)
