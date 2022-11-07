<template>
  <div>
    <div id="main" ref="main" />
  </div>
</template>

<script>
import echarts from 'echarts';
import chinaMap from 'echarts/map/json/china.json';
export default {
  data() {
    return {
      name: 'value',
    };
  },
  method() {},
  mounted() {
    var chain_map = echarts.init(this.$refs.main);
    echarts.registerMap('chinaMap', chinaMap); // 注册地图
    var option = {
      geo: {
        map: 'chinaMap', // 绘画的地图
        zoom: 0.8, // 缩放比例
        itemStyle: {
          // 每一项的样式
          areaColor: '#fff', // 地区颜色
          borderColor: '#666', // 边框颜色
          borderWidth: '0.3', // 边框宽度
          opacity: 1, // 不透明度
        },
        label: {
          // 文字
          show: true, // 展示文字
          fontSize: 8, // 字体大小
        },
        emphasis: {
          // 附加属性（强调）
          itemStyle: {
            areaColor: '#b4ffff', // 鼠标经过的颜色
          },
          select: {
            // 选中设置
            itemStyle: {
              areaColor: '#0f2c66', // 选中颜色设置
            },
          },
        },
      },
      tooltip: {
        // 提示框
        show: true, // 默认展示
        trigger: 'item', // 触发展示每一项
        triggerOn: 'click', // 触发形式（点击）
        formatter(parmas) {
          return `名称：${parmas.name} <br/>确诊人数：${parmas.value}`;
        },
        // 弹窗样式
        padding: 3, // 内边距
        borderColor: '#333',
        backgroundColor: 'rgba(50,50,50,0.7)', //
        textStyle: {
          // 文本样式
          color: '#fff',
        },
      },
      series: [
        {
          // 数据
          type: 'map', // 类型
          geoIndex: 0, // 索引
          data: [
            { name: '上海市', value: 123 },
            { name: '北京市', value: 233 },
          ],
        },
      ],
      visualMap: {
        // 视觉映射
        type: 'piecewise', // 分段
        pieces: [
          // 块<!--min~max区间值----label显示的字段（标题）color:展示的颜色-->
          { min: 0, max: 0, label: '0', color: '#fff' },
          { min: 1, max: 9, label: '1-9', color: '#ffe4da' },
          { min: 10, max: 99, label: '10-99', color: '#ff937f' },
          { min: 100, max: 999, label: '100-999', color: '#ff6c5e' },
          { min: 1000, max: 9999, label: '1000-9999', color: '#fe3335' },
          { min: 10000, label: '≥10000', color: '#cd0000' },
        ],
      },
    };
    chain_map.setOption(option);
  },
};
</script>

  <style scoped>
#main {
  width: 800px;
  height: 600px;
  /* background-color: #111; */
  margin: 0 auto;
}
</style>
