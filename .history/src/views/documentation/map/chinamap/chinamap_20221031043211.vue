<template>
  <div>
    <div id="main" ref="main" />
  </div>
</template>

<script>
import echarts from 'echarts'
import chinaMap from 'echarts/map/json/china.json'
export default {
  data() {
    return {
      name: 'value'
    }
  },
  method() {},
  mounted() {
    var china_map = echarts.init(this.$refs.main)
    echarts.registerMap('china', chinaMap) // 注册地图
    // 中国地图
    function randomData() {
      return Math.round(Math.random() * 500)
    }

    var optionChinaMap = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal', // 图例的排列方向
        textStyle: { color: '#fff' },
        x: 'left', // 图例的位置
        y: '20',

        data: ['全国数据']
      },

      visualMap: {
        // 颜色的设置  dataRange
        textStyle: { color: '#fff' },
        x: 'left',
        y: 'bottom',
        splitList: [
          { start: 1500 },
          { start: 900, end: 1500 },
          { start: 310, end: 1000 },
          { start: 200, end: 300 },
          { start: 50, end: 200 },
          { start: 0, end: 50 }
        ],
        // text:['高','低'],// 文本，默认为数值文本
        // color: ['#65A2D9', '#E09107', '#A3E00B']
        color: [
          '#5475f5',
          '#9feaa5',
          '#3FA7FF',
          '#66E0E3',
          '#FFDC5E',
          '#9fb5ea'
        ]
      },
      // roamController: {//控制地图的上下左右放大缩小
      //     show: true,
      //     x: 'right',
      //     mapTypeControl: {
      //         'china': true
      //     }
      // },
      series: [
        {
          name: '全国数据',
          type: 'map',
          mapType: 'china',
          zoom: 1.1, // 缩放比例
          roam: false, // 是否开启鼠标缩放和平移漫游
          itemStyle: {
            // 地图区域的多边形 图形样式
            normal: {
              // 是图形在默认状态下的样式
              label: {
                show: true,
                textStyle: { color: 'rgb(249, 249, 249)' }
              }
            },
            emphasis: {
              // 是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
              label: { show: true }
            }
          },
          top: '100', // 组件距离容器的距离
          data: [
            { name: '北京', value: '100' },
            { name: '天津', value: randomData() },
            { name: '上海', value: randomData() },
            { name: '重庆', value: randomData() },
            { name: '河北', value: randomData() },
            { name: '河南', value: randomData() },
            { name: '云南', value: randomData() },
            { name: '辽宁', value: randomData() },
            { name: '黑龙江', value: randomData() },
            { name: '湖南', value: randomData() },
            { name: '安徽', value: randomData() },
            { name: '山东', value: randomData() },
            { name: '新疆', value: randomData() },
            { name: '江苏', value: randomData() },
            { name: '浙江', value: randomData() },
            { name: '江西', value: randomData() },
            { name: '湖北', value: randomData() },
            { name: '广西', value: randomData() },
            { name: '甘肃', value: randomData() },
            { name: '山西', value: randomData() },
            { name: '内蒙古', value: randomData() },
            { name: '陕西', value: randomData() },
            { name: '吉林', value: randomData() },
            { name: '福建', value: randomData() },
            { name: '贵州', value: randomData() },
            { name: '广东', value: randomData() },
            { name: '青海', value: randomData() },
            { name: '西藏', value: randomData() },
            { name: '四川', value: randomData() },
            { name: '宁夏', value: randomData() },
            { name: '海南', value: randomData() },
            { name: '台湾', value: randomData() },
            { name: '香港', value: randomData() },
            { name: '澳门', value: randomData() }
          ]
        }
      ]
    }

    china_map.setOption(optionChinaMap, true)

    window.addEventListener('resize', function () {
      china_map.resize()
    })
  }
}
</script>

  <style scoped>
#main {
  width: 500px;
  height: 500px;
  /* background-color: #132952; */
  margin: 0 auto;
}
</style>
