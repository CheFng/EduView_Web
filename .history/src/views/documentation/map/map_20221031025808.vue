<template>
  <div class="container">
    <div class="box left">
      <dv-decoration-7 class="btn-box">
        <button class="button" @click="change(0)">
          <dv-decoration-11 id="btn1" class="btn">首页可视化</dv-decoration-11>
        </button>
        <button class="button" @click="change(1)">
          <dv-decoration-11 id="btn2" class="btn">面积可视化</dv-decoration-11>
        </button>
      </dv-decoration-7>
      <dv-border-box-8 class="border-box">
        <dv-scroll-board v-show="0===number" :config="config2" class="charts" style="height:260px" />
        <MixChart v-show="1===number" class="charts" style="height:300px" />
      </dv-border-box-8>
      <dv-border-box-1 class="border-box">
        <dv-scroll-ranking-board :config="config3" class="charts" style="height:260px" />
      </dv-border-box-1>
    </div>
    <div class="box center">
      <dv-border-box-11 title="数据可视化平台">
        <br>
        <ChinaMap v-show="0===number" class="charts" style="height:300px;" />
      </dv-border-box-11>
    </div>
    <div class="box right">
      <dv-border-box-1 class="border-box">
        <MixChart id="Mix" class="charts" style="height:300px" />
      </dv-border-box-1>
      <dv-border-box-8 class="border-box">
        <LineChart id="Line" class="charts" style="height:300px" />
      </dv-border-box-8>
    </div>
  </div>
</template>
<script>
import { config1, config2, config3, config4 } from './config.js'
import ChinaMap from './chinamap/chinamap'
import MixChart from '@/views/charts/mix-chart'
import LineChart from '@/views/charts/line'
export default {
  name: 'MapShow',
  components: { LineChart: LineChart, MixChart: MixChart, ChinaMap: ChinaMap },
  data() {
    return {
      number: 0,
      config1,
      config2,
      config3,
      config4
    }
  },
  methods: {
    change(num) {
      this.number = num
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: #01132c;
}
.left,
.right {
  width: 25%;
}
.center {
  width: 50%;
}
.box {
  display: flex;
  flex-direction: column;
}
.btn-box {
  display: flex;
  flex-direction: row;
}
.button {
  background-color: transparent;
  border-style: none;
}
.btn {
  width: 100px;
  height: 40px;
  color: #fff;
}
.charts {
  width: 90%;
  margin: 5%;
}
</style>
